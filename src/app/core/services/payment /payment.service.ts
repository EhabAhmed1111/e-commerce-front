import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { Payment } from '../../models/data';

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

  getPaymentById(id: string): Observable<Payment> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const url = 'http://localhost:8080/api/v1/payment/';
    return this.http.get<Payment>(`${url}${id}`, {headers});
  }
}
