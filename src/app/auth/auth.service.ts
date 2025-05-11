import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  token: string | null = null;
  baseApiUrl = 'http://localhost:1717/auth';


  get isAuth() {
    return !!this.token;
  }

  login(payload: {login: string, password: string}) {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}/login`,
      payload
      ).pipe(
        tap(value => {
          this.token = value.token;
        })
    )
  }
}
