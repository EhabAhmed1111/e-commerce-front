import { Injectable } from '@angular/core';
import { GlobalResponse } from '../../models/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // products: Product[] = [
  //   {
  //     id: '1',
  //     productName: 'Iphone',
  //     price: 2000,
  //     brand: 'IOS',
  //     amount: 8,
  //     description: 'Iphone 16 pro max',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  //   {
  //     id: '2',
  //     productName: 'Samsung',
  //     price: 1500,
  //     brand: 'Samsung',
  //     amount: 8,
  //     description: 'Samsung S25 ultra',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  //   {
  //     id: '2',
  //     productName: 'Samsung',
  //     price: 1500,
  //     brand: 'Samsung',
  //     amount: 8,
  //     description: 'Samsung S25 ultra',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  //   {
  //     id: '2',
  //     productName: 'Samsung',
  //     price: 1500,
  //     brand: 'Samsung',
  //     amount: 8,
  //     description: 'Samsung S25 ultra',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  //   {
  //     id: '2',
  //     productName: 'Samsung',
  //     price: 1500,
  //     brand: 'Samsung',
  //     amount: 8,
  //     description: 'Samsung S25 ultra',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  //   {
  //     id: '2',
  //     productName: 'Samsung',
  //     price: 1500,
  //     brand: 'Samsung',
  //     amount: 8,
  //     description: 'Samsung S25 ultra',
  //     categoryName: 'phone',
  //     medias: [],
  //   },
  // ];
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<GlobalResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
   return this.http.get<GlobalResponse>(`${url}products`);
  }
}
