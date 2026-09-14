import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart-service';

interface HomeProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  reviews: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
}

@Component({
  selector: 'app-homepage-component',
  imports: [],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  // =========================================================
  // MOBILE NAVIGATION
  // =========================================================

  showMobileNav = signal(false);

  toggleMobileNav(): void {
    this.showMobileNav.update((isOpen) => !isOpen);
  }

  // =========================================================
  // CATEGORIES
  // =========================================================

  categories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Tech for everyday life',
      productCount: 150,
      image: '/electronics.png',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Style that speaks',
      productCount: 120,
      image: '/fashion.png',
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      description: 'Make your space yours',
      productCount: 100,
      image: '/home.png',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      description: 'Feel good. Look good.',
      productCount: 80,
      image: '/beauty.png',
    },
  ];

  // =========================================================
  // FEATURED PRODUCTS
  // =========================================================

  featuredProducts: HomeProduct[] = [
    {
      id: 'product-001',
      name: 'Wireless Headphones Pro',
      category: 'Electronics',
      price: 149.99,
      oldPrice: 199.99,
      discount: 25,
      reviews: 128,
      image: 'https://picsum.photos/seed/headphones/600/600',
    },
    {
      id: 'product-002',
      name: 'Smart Watch Series 5',
      category: 'Electronics',
      price: 89.99,
      oldPrice: 119.99,
      discount: 25,
      reviews: 94,
      image: 'https://picsum.photos/seed/smartwatch/600/600',
    },
    {
      id: 'product-003',
      name: 'Premium Casual Sneakers',
      category: 'Fashion',
      price: 59.99,
      oldPrice: 79.99,
      discount: 25,
      reviews: 76,
      image: 'https://picsum.photos/seed/sneakers/600/600',
    },
    {
      id: 'product-004',
      name: 'Minimalist Backpack',
      category: 'Fashion',
      price: 44.99,
      oldPrice: 59.99,
      discount: 25,
      reviews: 61,
      image: 'https://picsum.photos/seed/backpack/600/600',
    },
    {
      id: 'product-005',
      name: 'Portable Bluetooth Speaker',
      category: 'Electronics',
      price: 49.99,
      oldPrice: 69.99,
      discount: 29,
      reviews: 113,
      image: 'https://picsum.photos/seed/bluetoothspeaker/600/600',
    },
    {
      id: 'product-006',
      name: 'Classic Cotton Hoodie',
      category: 'Fashion',
      price: 39.99,
      reviews: 55,
      image: 'https://picsum.photos/seed/hoodie/600/600',
    },
    {
      id: 'product-007',
      name: 'Modern Table Lamp',
      category: 'Home & Living',
      price: 34.99,
      reviews: 42,
      image: 'https://picsum.photos/seed/tablelamp/600/600',
    },
    {
      id: 'product-008',
      name: 'Smart Home Light',
      category: 'Home & Living',
      price: 24.99,
      oldPrice: 34.99,
      discount: 29,
      reviews: 37,
      image: 'https://picsum.photos/seed/smarthome/600/600',
    },
  ];

  // =========================================================
  // ELECTRONICS
  // =========================================================

  electronicsProducts: HomeProduct[] = [
    {
      id: 'electronics-001',
      name: 'Wireless Headphones Pro',
      category: 'Headphones',
      price: 149.99,
      oldPrice: 199.99,
      discount: 25,
      reviews: 128,
      image: 'https://picsum.photos/seed/headphones2/600/600',
    },
    {
      id: 'electronics-002',
      name: 'Smart Watch Series 5',
      category: 'Smart Watches',
      price: 89.99,
      oldPrice: 119.99,
      discount: 25,
      reviews: 94,
      image: 'https://picsum.photos/seed/watch2/600/600',
    },
    {
      id: 'electronics-003',
      name: 'Portable Bluetooth Speaker',
      category: 'Audio',
      price: 49.99,
      oldPrice: 69.99,
      discount: 29,
      reviews: 113,
      image: 'https://picsum.photos/seed/speaker2/600/600',
    },
    {
      id: 'electronics-004',
      name: 'Wireless Gaming Mouse',
      category: 'Computer Accessories',
      price: 39.99,
      reviews: 87,
      image: 'https://picsum.photos/seed/gamingmouse/600/600',
    },
  ];

  // =========================================================
  // FASHION
  // =========================================================

  fashionProducts: HomeProduct[] = [
    {
      id: 'fashion-001',
      name: 'Premium Casual Sneakers',
      category: 'Footwear',
      price: 59.99,
      oldPrice: 79.99,
      discount: 25,
      reviews: 76,
      image: 'https://picsum.photos/seed/sneakers2/600/600',
    },
    {
      id: 'fashion-002',
      name: 'Classic Cotton Hoodie',
      category: 'Clothing',
      price: 39.99,
      reviews: 55,
      image: 'https://picsum.photos/seed/hoodie2/600/600',
    },
    {
      id: 'fashion-003',
      name: 'Minimalist Backpack',
      category: 'Accessories',
      price: 44.99,
      oldPrice: 59.99,
      discount: 25,
      reviews: 61,
      image: 'https://picsum.photos/seed/backpack2/600/600',
    },
    {
      id: 'fashion-004',
      name: 'Everyday Casual T-Shirt',
      category: 'Clothing',
      price: 19.99,
      oldPrice: 29.99,
      discount: 33,
      reviews: 88,
      image: 'https://picsum.photos/seed/tshirt/600/600',
    },
  ];

  // =========================================================
  // HOME & LIVING
  // =========================================================

  homeLivingProducts: HomeProduct[] = [
    {
      id: 'home-001',
      name: 'Modern Table Lamp',
      category: 'Lighting',
      price: 34.99,
      oldPrice: 44.99,
      discount: 22,
      reviews: 42,
      image: 'https://picsum.photos/seed/lamp2/600/600',
    },
    {
      id: 'home-002',
      name: 'Minimalist Wall Clock',
      category: 'Decor',
      price: 29.99,
      reviews: 38,
      image: 'https://picsum.photos/seed/wallclock/600/600',
    },
    {
      id: 'home-003',
      name: 'Soft Throw Pillow',
      category: 'Home Decor',
      price: 18.99,
      oldPrice: 24.99,
      discount: 24,
      reviews: 52,
      image: 'https://picsum.photos/seed/pillow/600/600',
    },
    {
      id: 'home-004',
      name: 'Smart Home Light',
      category: 'Smart Home',
      price: 24.99,
      oldPrice: 34.99,
      discount: 29,
      reviews: 37,
      image: 'https://picsum.photos/seed/lightbulb/600/600',
    },
  ];

  // =========================================================
  // DEALS
  // =========================================================

  dealsProducts: HomeProduct[] = [
    {
      id: 'deal-001',
      name: 'Noise Cancelling Headphones',
      category: 'Electronics',
      price: 99.99,
      oldPrice: 159.99,
      discount: 38,
      reviews: 204,
      image: 'https://picsum.photos/seed/noisecancelling/600/600',
    },
    {
      id: 'deal-002',
      name: 'Premium Smart Watch',
      category: 'Electronics',
      price: 69.99,
      oldPrice: 109.99,
      discount: 36,
      reviews: 156,
      image: 'https://picsum.photos/seed/premiumwatch/600/600',
    },
    {
      id: 'deal-003',
      name: 'Urban Sneakers',
      category: 'Fashion',
      price: 44.99,
      oldPrice: 74.99,
      discount: 40,
      reviews: 119,
      image: 'https://picsum.photos/seed/urbansneakers/600/600',
    },
    {
      id: 'deal-004',
      name: 'LED Desk Lamp',
      category: 'Home & Living',
      price: 19.99,
      oldPrice: 32.99,
      discount: 39,
      reviews: 73,
      image: 'https://picsum.photos/seed/desklamp/600/600',
    },
  ];

  // =========================================================
  // NAVIGATION
  // =========================================================

  navigateToProducts(): void {
    this.router.navigate(['/products']);
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

  // =========================================================
  // CART
  // =========================================================

  addToCart(product: HomeProduct): void {
    console.log('Adding to cart:', product);
  }

  // =========================================================
  // WISHLIST
  // =========================================================

  addToWishlist(product: HomeProduct): void {
    console.log('Adding to wishlist:', product);
  }
}
