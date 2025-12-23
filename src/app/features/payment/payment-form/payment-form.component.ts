import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  signal,
  Signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Stripe,
  StripeElements,
  StripePaymentElement,
} from '@stripe/stripe-js';
import { PaymentService } from '../../../core/services/payment /payment.service';

@Component({
  selector: 'app-payment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  @Input() clientSecret: string = '';
  // this ref to element in html like seclection query
  @ViewChild('paymentElement') paymentElementRef!: ElementRef;

  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;

  paymentForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.paymentForm = this.fb.group({});
  }

  async ngOnChanges() {
    if (!this.clientSecret) {
      this.errorMessage = 'Client secret is missing';
      return;
    }
    this.errorMessage = '';
    // Initialize Stripe
    if (!this.paymentService.getStripe()) {
      await this.paymentService.initStripe();
    }
    this.stripe = this.paymentService.getStripe();

    if (!this.stripe) {
      this.errorMessage = 'Failed to load Stripe';
      return;
    }

    // Initialize Elements
    const appearance = {
      theme: 'stripe' as const,
    };
    this.elements = this.stripe.elements({
      appearance,
      clientSecret: this.clientSecret,
    });

    // Create and mount the Payment Element
    this.paymentElement = this.elements.create('payment');
    this.paymentElement.mount('#payment-element');
  }

  async handleSubmit() {
    if (!this.stripe || !this.elements) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.origin + '/payment/success',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
        this.errorMessage = error.message || 'An error occurred';
        this.router.navigate(['/payment/failure']);
      } else {
        this.errorMessage = 'An unexpected error occurred.';
        this.router.navigate(['/payment/failure']);
      }
      this.isLoading = false;
    } else {
      // The UI will be redirected, so we don't need to do anything here.
    }
  }
}
