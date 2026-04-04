import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { passwordMatchValidator } from '../../../validators/password-match.validator';
import { IUser } from '../../../interfaces/iuser';
import { UserService } from '../../../services/user/user-service';
import { log } from 'console';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.css',
})
export class SignUpComponent {
  private router: Router = inject(Router);
  userService = inject(UserService);
  pwdtype = 'password';
  cpwdtype = 'password';
  signUpForm = new FormGroup(
    {
      username: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required]),
      confirmPassword: new FormControl<string>('', Validators.required),
    },
    {
      validators: passwordMatchValidator,
    },
  );

  toggleShowPassword() {
    this.pwdtype = this.pwdtype === 'password' ? 'text' : 'password';
  }
  toggleShowConfirmPassword() {
    this.cpwdtype = this.cpwdtype === 'password' ? 'text' : 'password';
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  onSignUp() {
    const username = this.signUpForm.value.username ?? '';
    const email = this.signUpForm.value.email ?? '';
    const password = this.signUpForm.value.password ?? '';
    const data: IUser = {
      username: username,
      email: email,
      password: password,
    };
    this.userService.signUp(data).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.goToLogin();
      },
      error: (e) => {
        console.log('Error!!', e);
      },
    });
  }
}
