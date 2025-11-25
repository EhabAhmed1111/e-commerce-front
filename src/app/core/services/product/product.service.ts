import { Injectable } from '@angular/core';
import { ProductsResponse } from '../../models/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<ProductsResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<ProductsResponse>(`${url}products`);
  }
}
