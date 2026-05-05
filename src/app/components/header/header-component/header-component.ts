import { Component, inject } from '@angular/core';
import { DesktopNavComponent } from '../../navbar/desktopNav/desktop-nav-component/desktop-nav-component';
import { LogoComponent } from '../../logo/logo-component/logo-component';
import { MobileNavComponent } from '../../navbar/mobileNav/mobile-nav-component/mobile-nav-component';
import { Router } from '@angular/router';
import { Authservice } from '../../../services/auth/authservice';
import { CartService } from '../../../services/cart/cart-service';

@Component({
  selector: 'app-header-component',
  imports: [DesktopNavComponent, LogoComponent, MobileNavComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  authService = inject(Authservice);
  private router: Router = inject(Router);
  private cartService = inject(CartService);
  logout() {
    this.authService.removeToken();
    this.router.navigate(['login']);
    this.cartService.cart().items = [];
  }
}
