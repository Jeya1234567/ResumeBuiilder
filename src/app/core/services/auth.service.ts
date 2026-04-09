import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map,of, tap } from 'rxjs';
import { TokenService } from './token.service';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(payload: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
  }
  

  login(payload: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
  }

  isAuthenticated() {
    return this.http.get<{ authenticated: boolean }>(`${this.baseUrl}/check`).pipe(
      map(res => res.authenticated),
      tap((result) => console.log('Checked authentication', result)),
      catchError(() => of(false))
    );
  }

  logout() {
    return this .http.post(`${this.baseUrl}/logout`, {});
  }
}
