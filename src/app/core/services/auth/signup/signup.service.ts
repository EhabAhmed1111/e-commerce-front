import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest, SignupResponse } from '../../../models/data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(request: SignupRequest): Observable<SignupResponse> {
    const url = "http://localhost:8080/api/v1/auth/";
    return this.http.post<SignupResponse>(`${url}register`, request);
  }
}
