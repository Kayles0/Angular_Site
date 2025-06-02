import {Component, inject, signal} from '@angular/core';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-avatar-upload',
  imports: [],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  profileService = inject(ProfileService)
  profile = this.profileService.account
  preview = signal<string>(this.profileService.account()?.imageUrl || '/assets/imgs/img.png')

  fileBrowserHandler(event: Event){
    const file = (event.target as HTMLInputElement)?.files?.[0]

    if (!file || !file.type.match('image') || file.size > 10 * 1024 * 1024) return

    const reader = new FileReader()
    reader.onload = event => this.preview.set(event.target?.result as string)
    reader.readAsDataURL(file)

    this.profileService.selectedFile.set(file)
  }

}
