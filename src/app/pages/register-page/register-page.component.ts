import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    login: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  onSubmit() {
    if (this.form.valid){
      //@ts-ignore
      this.authService.register(this.form.value)
        .subscribe(res => {
          this.router.navigate([''])
        });
    }
  }
}
