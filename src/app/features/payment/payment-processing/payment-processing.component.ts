import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../core/services/payment /payment.service';
import { Payment } from '../../../core/models/data';

@Component({
  selector: 'app-payment-processing',
  imports: [RouterLink],
  templateUrl: './payment-processing.component.html',
  styleUrl: './payment-processing.component.scss',
})
export class PaymentProcessingComponent {
  // todo i need to get the current payment intent id and then make req api to check the status
  //of the payment intent
  constructor(
    private router: ActivatedRoute,
    private paymentService: PaymentService,
    private route: Router
  ) {}
  paymentId: string = '';
  intervalId: any;
  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.paymentId = params['id'];
      console.log(this.paymentId);
      this.intervalId = setInterval(() => {
        this.paymentService
          .getPaymentById(this.paymentId)
          .subscribe((payment: Payment) => {
            console.log(payment.data.status);
            if (payment.data.status === 'SUCCESS') {
              this.route.navigate(['payment/success']);
            } else if (payment.data.status === 'FAILED') {
              this.route.navigate(['payment/failure']);
            }
          });
      }, 10000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
