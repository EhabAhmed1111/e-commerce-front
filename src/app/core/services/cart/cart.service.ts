import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { CartResponse } from '../../models/data';
import { map, Observable, of } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // // Signal to hold cart items
  // cartItems = signal<CartItem[]>([]);

  // // Computed signal for total items count
  // totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  // // Computed signal for total price
  // totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  // this.cartItems.update(items => {
  //     const existingItem = items.find(i => i.id === item.id);
  //     if (existingItem) {
  //       return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
  //     }
  //     return [...items, { ...item, quantity: 1 }];
  //   });

  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number): Observable<CartResponse> {
    const params = { quantity };
    const url = 'http://localhost:8080/api/v1/carts/products/';
    return this.http.post<CartResponse>(
      `${url}${productId}/adding-to-cart`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params,
      }
    );
  }

  getCart(): Observable<CartResponse> {
    const url = 'http://localhost:8080/api/v1/carts';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.get<CartResponse>(url, {
      headers,
    });
  }

  getTotalQuantity(): Observable<number> {
    let count: number = 0;
    console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token') === null) {
  return of(count);
    }
    
    // this will return observable
  return this.getCart().pipe(
    map((cart)=> cart.data.cartItemsDto.length)
  );
  }
  // removeFromCart(itemId: number) {
  //   this.cartItems.update((items) => items.filter((i) => i.id !== itemId));
  // }

  // updateQuantity(itemId: number, quantity: number) {
  //   if (quantity <= 0) {
  //     this.removeFromCart(itemId);
  //     return;
  //   }
  //   this.cartItems.update((items) =>
  //     items.map((i) => (i.id === itemId ? { ...i, quantity } : i))
  //   );
  // }
}
