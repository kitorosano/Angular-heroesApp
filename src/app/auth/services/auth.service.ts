import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verificaAutenticacion(): Observable<boolean> {
    return !localStorage.getItem('token')
      ? of(false)
      : this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
          map((auth) => {
            this._auth = auth;
            return true;
          })
        );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((resp) => (this._auth = resp)),
      tap((usuario) => localStorage.setItem('token', usuario.id))
    );
  }

  logout(): void {
    this._auth = undefined;
  }
}
