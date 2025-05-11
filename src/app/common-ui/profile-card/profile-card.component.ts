import {Component, Input, OnChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Profile} from '../../data/interfaces/profile.interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-card',
  imports: [
    FormsModule
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnChanges{
  @Input() profile!: Profile;
  imageUrl: string = '/assets/imgs/img.png';
  baseApiUrl = 'http://localhost:1717';

  constructor(private http: HttpClient) { }

  loadImage(imageId: number) {
    this.http.get(`${this.baseApiUrl}/image/${imageId}`, {
        responseType: 'blob'
    }).subscribe(value => {
      this.imageUrl = URL.createObjectURL(value);
    });
  }

  ngOnChanges() {
    if (this.profile.imageId) {
      this.loadImage(this.profile.imageId);
    }
  }
}
