import {Component, Input, OnChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Profile} from '../../data/interfaces/profile.interface';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnChanges{
  @Input() profile!: Profile;

  constructor(private http: HttpClient) { }

  ngOnChanges() {

  }
}
