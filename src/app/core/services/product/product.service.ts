import { Injectable } from '@angular/core';
import {
  AddProductRequest,
  ProductsForVendorResponse,
  ProductsResponse,
  SingleProductResponse,
} from '../../models/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  /** get all products */
  fetchProducts(): Observable<ProductsResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<ProductsResponse>(`${url}products`);
  }

  /** get single product */
  fetchSingleProduct(id: string): Observable<SingleProductResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<SingleProductResponse>(`${url}products/${id}`);
  }

  /** todo complete this function
   * you need to create interface to get the response
   */
  fetchProductsByVendorId(id: string): Observable<ProductsForVendorResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<ProductsForVendorResponse>(
      `${url}products/vendor/${id}`
    );
  }

  fetchProductForCurrentVendor(): Observable<ProductsForVendorResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.get<ProductsForVendorResponse>(`${url}products/vendor`, {
      headers,
    });
  }

  addProduct(
    addProductReq: AddProductRequest
  ): Observable<SingleProductResponse> {
    const url: string = 'http://localhost:8080/api/v1/';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return this.http.post<SingleProductResponse>(
      `${url}products`,
      addProductReq,
      { headers }
    );
  }

  deleteProduct(id: string): Observable<void> {
    const url: string = 'http://localhost:8080/api/v1/';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.delete<void>(`${url}products/${id}`, { headers });
  }
}
