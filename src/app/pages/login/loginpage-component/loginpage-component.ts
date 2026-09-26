import { Component, inject, signal } from '@angular/core';
import { Authservice } from '../../../services/auth/authservice';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart-service';

@Component({
  selector: 'app-loginpage-component',
  imports: [ReactiveFormsModule],
  templateUrl: './loginpage-component.html',
  styleUrl: './loginpage-component.css',
})
export class LoginpageComponent {
  private router: Router = inject(Router);
  authservice = inject(Authservice);
  cartService = inject(CartService);
  isLoggingIn = signal<boolean>(false);
  ptype = 'password';
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
    this.isLoggingIn.set(true);
    this.authservice.loginForAccessToken(username, password).subscribe({
      next: (res) => {
        // console.log(res);
        // this.authservice.currentUser.set(res.payload.user);
        this.authservice.setToken(res.access_token);
        this.authservice.setCurrentUser(res.user);
        // console.log('Login Successful');
        this.cartService.getCart().subscribe((res) => {
          // console.log(res);
          this.cartService.cart.set(res.payload ?? {});
        });
        this.router.navigate(['products']);
        setTimeout(() => {
          this.authservice.removeToken();
          this.router.navigate([this.login]);
        }, 3600000);
        this.isLoggingIn.set(false);
      },
      error: (e) => {
        this.isLoggingIn.set(false);
        alert(e.error.detail);
      },
    });
  }
  showPassword() {
    this.ptype = this.ptype === 'password' ? 'text' : 'password';
    return;
  }
  onLoginRequest() {
    this.login();
  }
}
