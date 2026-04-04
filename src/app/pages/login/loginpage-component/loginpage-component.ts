import { Component, inject } from '@angular/core';
import { Authservice } from '../../../services/auth/authservice';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage-component',
  imports: [ReactiveFormsModule],
  templateUrl: './loginpage-component.html',
  styleUrl: './loginpage-component.css',
})
export class LoginpageComponent {
  private router: Router = inject(Router);
  authservice = inject(Authservice);
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  goToSignup() {
    this.router.navigate(['signup']);
  }
  login() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    if (!username || !password) {
      console.log('Please provide the correct details');
      return;
    }
    this.authservice.loginForAccessToken(username, password).subscribe({
      next: (token) => {
        this.authservice.setToken(token.access_token);
        console.log('Login Successful');
        this.router.navigate(['products']);
        setTimeout(() => this.authservice.removeToken(), 3600000);
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }
  onLoginRequest() {
    this.login();
  }
}
