import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {

   }

  createOrder(): Observable<OrderResponse> {
    const url: string = 'http://localhost:8080/api/v1/orders';
    const token = localStorage.getItem('token');
    return this.http.post<OrderResponse>(url, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
