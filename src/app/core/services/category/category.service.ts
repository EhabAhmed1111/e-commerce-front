import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoriesResponse> {
    const url: string = 'http://localhost:8080/api/v1/';
    return this.http.get<CategoriesResponse>(`${url}categories`)
  }
}
