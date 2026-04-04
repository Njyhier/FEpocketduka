import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../../../searchbar/searchbar-component/searchbar-component';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart/cart-service';

@Component({
  selector: 'app-desktop-nav-component',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './desktop-nav-component.html',
  styleUrl: './desktop-nav-component.css',
})
export class DesktopNavComponent {
  private router: Router = inject(Router);
  cartService = inject(CartService);
  goToHome() {
    this.router.navigate(['homepage']);
  }
  navigateToProducts() {
    this.router.navigate(['products']);
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
}
