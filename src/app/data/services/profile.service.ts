import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  constructor() { }

  baseApiUrl = 'http://localhost:1717';
  imageUrl: string | null = null;

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/person`);
  }

}
