import { Injectable } from '@angular/core';
import { ProductsResponse, SingleProductResponse } from '../../models/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  /** get all products */
  fetchProducts(): Observable<ProductsResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<ProductsResponse>(`${url}products`);
  }

  /** get single product */
  fetchSingleProduct(id: string): Observable<SingleProductResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<SingleProductResponse>(`${url}products/${id}`)
  }
}
