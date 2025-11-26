import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../../../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    const url = "http://localhost:8080/api/v1/auth/";
    return this.http.post<LoginResponse>(`${url}login`, request);
  }
}
