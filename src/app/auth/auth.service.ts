import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  token: string | null = null;
  baseApiUrl = 'http://localhost:1717/auth';
  cookieService = inject(CookieService)
  private jwtHelper = new JwtHelperService();


  get isAuth() {
    if (!this.token){
      this.token = this.cookieService.get('token');
    }

    return !this.jwtHelper.isTokenExpired(this.token);
    // return !!this.token;
  }

  login(payload: {login: string, password: string}) {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}/login`,
      payload
      ).pipe(
        tap(value => {
          this.token = value.token;

          this.cookieService.set('token', this.token);
        })
    )
  }

  register(payload: {login: string, password: string}) {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}/register`,
      payload
    ).pipe(
      tap(value => {
        this.token = value.token;

        this.cookieService.set('token', this.token);
      })
    )
  }

  logout() {
    this.cookieService.delete('token')
    this.token = null
    this.router.navigate(['/login'])
  }
}
