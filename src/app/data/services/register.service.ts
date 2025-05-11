import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  private baseApiUrl = 'http://localhost:1717';

  addUser(user: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.baseApiUrl, user);
  }
}
