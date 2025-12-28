import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  SimpleChanges,
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
export class PaymentFormComponent implements OnChanges, OnDestroy {
  @Input() clientSecret: string = '';
  @Input() paymentId: string = '';
  @ViewChild('paymentElementContainer') paymentElementContainer!: ElementRef;

  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;

  paymentForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Track initialization state
  private isInitialized = false;

  constructor() {
    console.log('🔵 PaymentFormComponent constructor called');
    this.paymentForm = this.fb.group({});
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('🔄 ngOnChanges called', {
      hasClientSecretChanges: !!changes['clientSecret'],
      clientSecret: this.clientSecret,
      changes: changes
    });

    // Only proceed if clientSecret changed and has value
    if (!changes['clientSecret'] || !this.clientSecret) {
      console.log('❌ No clientSecret or no changes to clientSecret');
      this.errorMessage = this.clientSecret ? '' : 'Client secret is missing';
      return;
    }

    console.log('✅ Client secret received:', this.clientSecret.substring(0, 20) + '...');

    // Clean up previous elements
    this.cleanupElements();

    await this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    console.log('🔄 initializeStripe() called');
    try {
      this.isLoading = true;
      this.errorMessage = '';

      console.log('1️⃣ Checking if Stripe is initialized...');
      // Initialize Stripe if not already done
      if (!this.paymentService.getStripe()) {
        console.log('🔄 Stripe not initialized, calling initStripe()');
        await this.paymentService.initStripe();
      } else {
        console.log('✅ Stripe already initialized');
      }
      
      this.stripe = this.paymentService.getStripe();
      console.log('2️⃣ Stripe instance obtained:', !!this.stripe);

      if (!this.stripe) {
        console.error('❌ Failed to get Stripe instance');
        throw new Error('Failed to load Stripe');
      }

      console.log('✅ Stripe loaded successfully');

      // Initialize Elements
      const appearance = {
        theme: 'stripe' as const,
      };
      
      console.log('3️⃣ Creating Stripe elements with client secret');
      this.elements = this.stripe.elements({
        appearance,
        clientSecret: this.clientSecret,
      });

      console.log('4️⃣ Elements created:', !!this.elements);

      // Create and mount the Payment Element
      console.log('5️⃣ Creating payment element...');
      this.paymentElement = this.elements.create('payment', {
        layout: {
          type: 'tabs',
          defaultCollapsed: false,
        }
      });

      console.log('6️⃣ Mounting payment element to #payment-element');
      this.paymentElement.mount('#payment-element');
      
      // Add event listeners for debugging
      this.paymentElement.on('ready', () => {
        console.log('✅ Payment Element is READY');
      });

      this.paymentElement.on('change', (event) => {
        console.log('📝 Payment Element changed:', {
          complete: event.complete,
          empty: event.empty,
          error: event.value
        });
      });

      this.paymentElement.on('focus', (event) => {
        console.log('🎯 Payment Element focused on:', event.elementType);
      });

      this.paymentElement.on('blur', (event) => {
        console.log('👋 Payment Element blurred from:', event.elementType);
      });

      this.isInitialized = true;
      console.log('🎉 Stripe initialization COMPLETE');

    } catch (error) {
      console.error('❌ Failed to initialize Stripe:', error);
      this.errorMessage = 'Failed to initialize payment system. Please try again.';
    } finally {
      this.isLoading = false;
      console.log('🏁 initializeStripe() completed, isLoading:', this.isLoading);
    }
  }

  async handleSubmit() {
    console.log('🔄 handleSubmit() called');
    console.log('📊 Current state:', {
      stripe: !!this.stripe,
      elements: !!this.elements,
      paymentElement: !!this.paymentElement,
      isLoading: this.isLoading,
      isInitialized: this.isInitialized,
      clientSecret: this.clientSecret ? 'present' : 'missing'
    });

    if (!this.stripe || !this.elements) {
      console.error('❌ Cannot submit: Payment system not initialized');
      this.errorMessage = 'Payment system not initialized';
      return;
    }

    if (!this.clientSecret) {
      console.error('❌ Cannot submit: No client secret');
      this.errorMessage = 'No payment session';
      return;
    }
    // console.info(this.clientSecret);

    console.log('✅ Pre-conditions met, proceeding with payment');

    this.isLoading = true;
    this.errorMessage = '';
    console.log('⏳ Loading started');

    try {
      console.log('1️⃣ Submitting elements for validation...');
      // First validate the form
      const { error: submitError } = await this.elements.submit();
      if (submitError) {
        console.error('❌ Element submission error:', submitError);
        this.errorMessage = submitError.message as string;
        this.isLoading = false;
        return;
      }
      console.log('✅ Elements submitted successfully');

      console.log('2️⃣ Calling stripe.confirmPayment()...');
      // console.log('📋 Confirm payment params:', {
      //   hasElements: !!this.elements,
      //   return_url: window.location.origin + '/payment/success',
      //   redirect: 'if_required'
      // });

      const result = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // todo here I should send the payment id 
          return_url: window.location.origin + `/payment/pending/${this.paymentId}`,
        },
        redirect: 'if_required',
      });

      console.log('📦 confirmPayment result:', result);

      if (result.error) {
        console.error('❌ Stripe payment error:', {
          type: result.error.type,
          code: result.error.code,
          message: result.error.message,
          decline_code: result.error.decline_code,
          payment_intent: result.error.payment_intent
        });

        // Handle specific error types
        if (result.error.type === 'card_error' || result.error.type === 'validation_error') {
          this.errorMessage = result.error.message || 'Payment failed. Please check your card details.';
          console.log('💳 Card/validation error, showing message to user');
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          console.log('⚠️ Unexpected error, will navigate to failure page');
          setTimeout(() => {
            this.router.navigate(['/payment/failure']);
          }, 2000);
        }
      } else {
        console.log('✅ Payment submitted successfully!');
        console.log('🔄 Checking payment intent status...');
        
        // Check the payment intent status
        const { paymentIntent, error: retrieveError } = await this.stripe.retrievePaymentIntent(this.clientSecret);
        
        if (retrieveError) {
          console.error('❌ Error retrieving payment intent:', retrieveError);
        } else if (paymentIntent) {
          console.log('📊 Payment Intent status:', paymentIntent.status);
          
          if (paymentIntent.status === 'succeeded') {
            console.log('🎉 Payment succeeded! Redirecting...');
            window.location.origin + `/payment/pending/${this.paymentId}`
            // this.router.navigate(['/payment/success']);
            this.router.navigate([`/payment/pending/${this.paymentId}`]);
          } else if (paymentIntent.status === 'processing') {
            console.log('⏳ Payment processing...');
            this.errorMessage = 'Payment is processing. Please wait...';
          } else if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_confirmation') {
            console.log('🔐 Payment requires action/confirmation');
            this.errorMessage = 'Additional verification required. Please follow the instructions.';
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Unhandled error in handleSubmit:', error);
      this.errorMessage = 'Payment processing failed. Please try again.';
      this.router.navigate(['/payment/failure']);
    } finally {
      this.isLoading = false;
      console.log('🏁 handleSubmit() completed, isLoading:', this.isLoading);
    }
  }

  private cleanupElements(): void {
    console.log('🔄 cleanupElements() called');
    if (this.paymentElement) {
      try {
        console.log('🗑️ Unmounting and destroying payment element');
        this.paymentElement.unmount();
        this.paymentElement.destroy();
        console.log('✅ Payment element cleaned up');
      } catch (error) {
        console.warn('⚠️ Error cleaning up payment element:', error);
      }
      this.paymentElement = null;
    }
    
    if (this.elements) {
      try {
        console.log('🗑️ Destroying elements');
        this.elements.getElement('payment')?.destroy();
        console.log('✅ Elements destroyed');
      } catch (error) {
        console.warn('⚠️ Error destroying elements:', error);
      }
      this.elements = null;
    }
    
    this.isInitialized = false;
    console.log('🏁 cleanupElements() completed');
  }

  ngOnDestroy() {
    console.log('👋 ngOnDestroy() called');
    this.cleanupElements();
  }

  // Debug method to check current state
  debugState() {
    console.log('🐛 DEBUG STATE:', {
      clientSecret: this.clientSecret ? 'present' : 'missing',
      stripe: !!this.stripe,
      elements: !!this.elements,
      paymentElement: !!this.paymentElement,
      isLoading: this.isLoading,
      isInitialized: this.isInitialized,
      errorMessage: this.errorMessage
    });
  }

  // Test method to simulate form fill
  async testWithCard(cardNumber: string) {
    console.log('🧪 Test with card:', cardNumber);
    this.debugState();
    
    // Note: You can't auto-fill Stripe elements for security reasons
    // This is just for logging purposes
    alert(`Please manually enter:\nCard: ${cardNumber}\nExp: 12/34\nCVC: 123\nZIP: 12345`);
  }
}