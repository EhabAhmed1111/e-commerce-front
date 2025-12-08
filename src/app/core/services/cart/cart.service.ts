import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { CartItemDto, CartResponse } from '../../models/data';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

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

  constructor(private http: HttpClient) {}

cartItem = signal<CartItemDto[]>([]);

cartItemQuantity$ = computed(() => this.cartItem().reduce((total, item) => total + item.quantity, 0));

  addToCart(productId: string, quantity: number): Observable<CartResponse> {
    const params = { quantity };
    const url = 'http://localhost:8080/api/v1/carts/products/';

    const headers = {
 'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.post<CartResponse>(
      `${url}${productId}/adding-to-cart`,
      {},
      {
        headers,
        params,
      }
    ).pipe(
      tap((cart) => {
        const items: CartItemDto[] = cart.data.cartItemsDto.map((item) => ({
          id: item.id,
          unitePrice: item.unitePrice,
          totalPrice: item.totalPrice,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
          quantity: item.quantity,
          productResponse: item.productResponse
        }));
        this.cartItem.set(items);
      })
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
    }).pipe(
      tap((cart) => {
        const items: CartItemDto[] = cart.data.cartItemsDto.map((item) => ({
          id: item.id,
          unitePrice: item.unitePrice,
          totalPrice: item.totalPrice,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
          quantity: item.quantity,
          productResponse: item.productResponse
        }));
        this.cartItem.set(items);
      })
    );
  } 
  
  updateQuantityOfItem(productId: string, quantity: number): Observable<CartResponse> {
    const url = 'http://localhost:8080/api/v1/carts';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const params = { quantity };
    return this.http.put<CartResponse>(`${url}/products/${productId}`, {}, {
      headers,
      params,
    }).pipe(
      /* here we update signal to effect in global state */ 
      tap((cart) => {
        const items: CartItemDto[] = cart.data.cartItemsDto.map((item) => ({
          id: item.id,
          unitePrice: item.unitePrice,
          totalPrice: item.totalPrice,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
          quantity: item.quantity,
          productResponse: item.productResponse
        }));
        this.cartItem.set(items);
      })
    );
  }  
  
  removeCartItemFromCart(cartItemId: string): Observable<CartResponse> {
    const url = 'http://localhost:8080/api/v1/carts';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.delete<CartResponse>(`${url}/cart-items/${cartItemId}`, {
      headers,
    }).pipe(
      /* here we update signal to effect in global state */ 
      tap((cart) => {
        const items: CartItemDto[] = cart.data.cartItemsDto.map((item) => ({
          id: item.id,
          unitePrice: item.unitePrice,
          totalPrice: item.totalPrice,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
          quantity: item.quantity,
          productResponse: item.productResponse
        }));
        this.cartItem.set(items);
      })
    );
  }

  /* when i need it i will implement it */
  // removeCart(): Observable<CartResponse> {
  //   const url = 'http://localhost:8080/api/v1/carts';
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   };
  //   return this.http.delete<CartResponse>(`${url}/cart-items/${cartItemId}`, {
  //     headers,
  //   }).pipe(
  //     /* here we update signal to effect in global state */ 
  //     tap((cart) => {
  //       const items: CartItemDto[] = cart.data.cartItemsDto.map((item) => ({
  //         id: item.id,
  //         unitePrice: item.unitePrice,
  //         totalPrice: item.totalPrice,
  //         updatedAt: item.updatedAt,
  //         createdAt: item.createdAt,
  //         quantity: item.quantity,
  //         productResponse: item.productResponse
  //       }));
  //       this.cartItem.set(items);
  //     })
  //   );
  // }



  // getTotalQuantity() {
  // this.getCart();
  // }

}
