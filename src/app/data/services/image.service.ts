import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseApiUrl = 'http://localhost:1717';
  imageUrl: string | null = null;

  constructor(private http: HttpClient) { }

  loadImage(imageId: number) {
    this.http.get(`${this.baseApiUrl}/image/${imageId}`, {
      responseType: 'blob'
    }).subscribe(blob => {
      this.imageUrl = URL.createObjectURL(blob)
    })
  }

}
