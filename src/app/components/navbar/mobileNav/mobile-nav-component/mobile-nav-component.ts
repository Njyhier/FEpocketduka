import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../../../searchbar/searchbar-component/searchbar-component';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart/cart-service';
import { NgClass } from '@angular/common';
import { NavService } from '../../../../services/nav/nav-service';
@Component({
  selector: 'app-mobile-nav-component',
  standalone: true,
  imports: [SearchbarComponent, NgClass],
  templateUrl: './mobile-nav-component.html',
  styleUrl: './mobile-nav-component.css',
})
export class MobileNavComponent {
  private router: Router = inject(Router);
  cartService = inject(CartService);
  navService = inject(NavService);

  showDropdown = false;
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
