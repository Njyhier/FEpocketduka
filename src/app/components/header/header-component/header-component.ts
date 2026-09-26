import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart-service';
import { HomeProduct } from '../../../pages/homepage/homepage-component/homepage-component';
import { Authservice } from '../../../services/auth/authservice';
import { ProductService } from '../../../services/product/product-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(Authservice);
  productService = inject(ProductService);

  private router = inject(Router);
  currentUser = this.authService.currentUser();

  isLoggedIn = signal(this.authService.isLoggedIn());

  isAdmin = signal(this.authService.isAuthorised('string'));

  showMobileNav = signal(false);

  toggleMobileNav(): void {
    this.showMobileNav.update((isOpen) => !isOpen);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: {
        category,
      },
    });
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  addToCart(product: HomeProduct): void {
    console.log('Adding to cart:', product);
  }

  addToWishlist(product: HomeProduct): void {
    console.log('Adding to wishlist:', product);
  }
  showAccountMenu = signal(false);

  toggleAccountMenu(): void {
    this.showAccountMenu.update((value) => !value);
  }

  closeAccountMenu(): void {
    this.showAccountMenu.set(false);
  }

  navigateToAccount(): void {
    this.closeAccountMenu();
    this.router.navigate(['/profile']);
  }

  navigateToOrders(): void {
    this.closeAccountMenu();
    this.router.navigate(['/orders']);
  }

  navigateToAdmin(): void {
    this.closeAccountMenu();
    this.router.navigate(['/admin']);
  }

  navigateToSignup(): void {
    this.closeAccountMenu();
    this.router.navigate(['/signup']);
  }

  logout(): void {
    // Authentication logic will be added later.
    this.isLoggedIn.set(false);
    this.closeAccountMenu();

    this.router.navigate(['/login']);
  }
}
