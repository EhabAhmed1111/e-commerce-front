import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorResponse } from '../../models/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllVendors(): Observable<VendorResponse> {
    const url = `http://localhost:8080/api/v1/users/vendors`;
    return this.http.get<VendorResponse>(url);
  } 
  
  deleteUserById(id: string): Observable<void> {
    const url = `http://localhost:8080/api/v1/users/`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete<void>(`${url}${id}`, {headers});
  }
}
