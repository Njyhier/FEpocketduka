import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../../../searchbar/searchbar-component/searchbar-component';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart/cart-service';
import { NgClass } from '@angular/common';
import { NavService } from '../../../../services/nav/nav-service';
@Component({
  selector: 'app-desktop-nav-component',
  standalone: true,
  imports: [SearchbarComponent, NgClass],
  templateUrl: './desktop-nav-component.html',
  styleUrl: './desktop-nav-component.css',
})
export class DesktopNavComponent {
  private router: Router = inject(Router);
  cartService = inject(CartService);
  showDropdown = false;
  navService = inject(NavService);
  toggleMobileNav() {
    this.navService.showMobileNav.set(!this.navService.showMobileNav);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goToHome() {
    this.router.navigate(['homepage']);
  }
  navigateToProducts() {
    this.router.navigate(['products']);
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
  goToAdminPage() {
    this.router.navigate(['admin']);
  }
}
