import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';
import {catchError, forkJoin, map, Observable, of, switchMap, tap, throwError} from 'rxjs';
import {Image} from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  baseApiUrl = 'http://localhost:1717';

  me = signal<Profile | null>(null)
  account = signal<Profile | null>(null)
  selectedFile = signal<File | null>(null)

  getTestAccounts() : Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/person/all`)
      .pipe(
        switchMap(profiles => {
          const profileObservables = profiles.map(
            profile => this.profileWithImage(profile)
          )

          return profileObservables.length > 0 ? forkJoin(profileObservables) : of([]);
        }),
        catchError(err => {
          console.log('Error loading profiles: ', err);
          return of([]);
        })
      );
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}/person/me`)
      .pipe(
        switchMap(profile => this.profileWithImage(profile)),
        tap(profile => {
          this.me.set(profile);
          this.account.set(profile)
        }),
        catchError(err => {
          console.error('Error loading profile:', err);
          return throwError(() => err);
        })
      )
  }

  getAccount(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}/person/${id}`)
      .pipe(
        switchMap(profile => this.profileWithImage(profile)),
        tap(profile => {
          this.account.set(profile);
        }),
        catchError(err => {
          console.error('Error loading profile:', err);
          return throwError(() => err);
        })
      )
  }

  uploadImage() {
    const file = this.selectedFile();
    if (!file) return;

    const formData = new FormData();
    formData.set('file', file, file.name)

    if (this.me() == this.account()) {
      this.http.post<Image>(`${this.baseApiUrl}/person/recreateImage`, formData).subscribe({
        next: response => {
          console.log('Upload success', response)
        },
        error: err => console.error('Upload error', err)
      });
    } else {
      this.http.post<Image>(`${this.baseApiUrl}/admin/person/${this.account()?.id}/updateImage`, formData).subscribe({
        next: response => {
          console.log('Upload success', response)
        },
        error: err => console.error('Upload error', err)
      })
    }


  }


  private loadImage(imageId : number): Observable<string> {
    return this.http.get(`${this.baseApiUrl}/image/${imageId}`, {
      responseType: 'blob'
    }).pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(() => of('/assets/imgs/img.png'))
    );
  }

  private profileWithImage(profile: Profile): Observable<Profile> {
    const profileCopy = {...profile, imageUrl: '/assets/imgs/img.png'};

    if (!profile.imageId) {
      return of(profileCopy);
    }

    return this.loadImage(profile.imageId).pipe(
      map(imageUrl => {
        return {...profile, imageUrl};
      })
    );
  }

  patchProfile(profile: Partial<Profile>){
    if (this.me() == this.account()) {
      return this.http.put<Profile>(
        `${this.baseApiUrl}/person`,
        profile
      )
    }
    else {
      return this.http.put<Profile>(
        `${this.baseApiUrl}/admin/updatePerson/${this.account()?.id}`,
        profile
      )
    }
  }

}
