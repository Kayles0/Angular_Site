import {Component, effect, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {NgForOf} from '@angular/common';
import {Department, Gender, Status} from '../../data/interfaces/profile.interface';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    NgForOf,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent{
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)


  departments = [
    { id: Department.Software_Development, name: 'Software Development' },
    { id: Department.Quality_Assurance, name: 'Quality Assurance' },
    { id: Department.DevOps, name: 'DevOps' },
    { id: Department.Support_Operations, name: 'Support & Operations' },
    { id: Department.Mobile_Development, name: 'Mobile Development' }
  ];

  statuses = [
    { id: Status.ACTIVE, name: 'Работает'},
    { id: Status.ON_VACATION, name: 'В отпуске' },
    { id: Status.DISMISSED, name: 'Уволен'},
    { id: Status.ON_PROBATION, name: 'На испытательном сроке'},
    { id: Status.INTERN, name: "Стажёр"}
  ]

  genders = [
    { id: Gender.Female, name: 'Female'},
    { id: Gender.Male, name: 'Male'}
  ]

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.required],
    department: ['', Validators.required],
    status: ['', Validators.required],
    imageId: ['', Validators.required]
  })

  constructor() {
    effect(() => {
      const profileData = this.profileService.account();
      if (profileData) {
        this.form.patchValue({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          gender: profileData.gender,
          email: profileData.email,
          // @ts-ignore
          department: profileData.department,
          // @ts-ignore
          status: profileData.status,
          // @ts-ignore
          imageId: profileData.imageId | null
        }, { emitEvent: false }); // Отключаем события, чтобы избежать цикла
      }
    });
  }

  goodSuccess = false
  errorSuccess = false

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) {
      this.errorSuccess = true
      this.goodSuccess = false
      return
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile(this.form.value)).then(this.goodSuccess = true, this.errorSuccess = false)
    this.profileService.uploadImage()
  }
}
