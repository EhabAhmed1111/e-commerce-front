import { Injectable } from '@angular/core';
import { DecodedToken } from '../../../models/data';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getEmailFromToken(): string | null {
    return this.decodeToken()?.sub ?? null;
  }

  /** this will used to show vendor dashboard or admin dashboard */
  getRoleFromToken(): string | null {
    return this.decodeToken()?.role ?? null;
  }
}
