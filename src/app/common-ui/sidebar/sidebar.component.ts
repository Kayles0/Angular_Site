import {Component, inject, OnChanges, OnInit} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {routes} from '../../app.routes';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService)
  me = this.profileService.me
  authService = inject(AuthService)

  constructor(private http : HttpClient) { }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
      .catch(err => console.log(err))
  }

  logout() {
    this.authService.logout();
  }
}
