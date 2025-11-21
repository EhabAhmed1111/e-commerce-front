import { Injectable } from '@angular/core';
import { Product } from '../../models/data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    {
      id: "1",
      productName: 'Iphone',
      price: 2000,
      brand: 'IOS',
      amount: 8,
      description: 'Iphone 16 pro max',
      categoryName: 'phone',
      medias: [],
    },
    {
      id: "2",
      productName: 'Samsung',
      price: 1500,
      brand: 'Samsung',
      amount: 8,
      description: 'Samsung S25 ultra',
      categoryName: 'phone',
      medias: [],
    },
    {
      id: "2",
      productName: 'Samsung',
      price: 1500,
      brand: 'Samsung',
      amount: 8,
      description: 'Samsung S25 ultra',
      categoryName: 'phone',
      medias: [],
    },
    {
      id: "2",
      productName: 'Samsung',
      price: 1500,
      brand: 'Samsung',
      amount: 8,
      description: 'Samsung S25 ultra',
      categoryName: 'phone',
      medias: [],
    },{
      id: "2",
      productName: 'Samsung',
      price: 1500,
      brand: 'Samsung',
      amount: 8,
      description: 'Samsung S25 ultra',
      categoryName: 'phone',
      medias: [],
    },{
      id: "2",
      productName: 'Samsung',
      price: 1500,
      brand: 'Samsung',
      amount: 8,
      description: 'Samsung S25 ultra',
      categoryName: 'phone',
      medias: [],
    },
  ];
  constructor() {}

  getProuctsFromApi(): Product[] {
    return this.products;
  }
}
