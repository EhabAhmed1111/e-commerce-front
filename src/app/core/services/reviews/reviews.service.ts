import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewRequest, ReviewResponse, ReviewResponseForAddReview } from '../../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviews(productId: string): Observable<ReviewResponse> {
    const url = "http://localhost:8080/api/v1/reviews/product/";
    return this.http.get<ReviewResponse>(`${url}${productId}`);
  } 
  
  addReviews(productId: string, review: ReviewRequest): Observable<ReviewResponseForAddReview> {
    const url = "http://localhost:8080/api/v1/reviews/product/";
    return this.http.post<ReviewResponseForAddReview>(`${url}${productId}`, review, {headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
  }
}
