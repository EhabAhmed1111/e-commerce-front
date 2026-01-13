import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDataResponse } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardDataResponse> {
    const url: string = "http://localhost:8080/api/v1/dashboard";
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<DashboardDataResponse>(url, { headers });
  }
}
