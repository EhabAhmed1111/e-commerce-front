import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistResponse, WishlistResponseForCheck } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<WishlistResponse> {
    const url = "http://localhost:8080/api/v1/users/wishlist"
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<WishlistResponse>(url, {
      headers
    });
  }

  checkIsFavorite(productId: string): Observable<WishlistResponseForCheck> {
    const url = "http://localhost:8080/api/v1/users/wishlist/favorite"
    const params = {
      productId
    }
    const headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<WishlistResponseForCheck>(url, {
      headers,
      params
    });
  } 

  addToWishlist(productId: string): Observable<WishlistResponse> {
    const url = "http://localhost:8080/api/v1/users/products"
    const headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.post<WishlistResponse>(`${url}/${productId}/wishlist`,{}, {
      headers
    });
  } 
  
  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    const url = "http://localhost:8080/api/v1/users/products"
    const headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete<WishlistResponse>(`${url}/${productId}/wishlist`, {
      headers
    });
  }
}
