import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(value => {
        this.profiles = value;
      });
  }
}
