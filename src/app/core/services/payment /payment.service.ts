import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {
   }

  async initStripe() {
    this.stripe = await loadStripe('pk_test_51SgkiRCuRpHZJWFKvQ0dKjTQbU6ebaZFJwrQ1Do9iejgP43tcNNM5y7aSgHBsG5bSfD7U91q8ejqMmpGZe3UA5Hz00nUOz6xD3');
  }

  getStripe() {
    return this.stripe;
  }
}
