import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  name: string;
  description: string;
  image: string;
  route: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.css',
})
export class LandingPageComponent {
  private router = inject(Router);

  categories: Category[] = [
    {
      name: 'Electronics',
      description: 'Phones, laptops, accessories and more.',
      image: '/electronics.png',
      route: 'Electronics',
    },
    {
      name: 'Fashion',
      description: 'Discover clothing, shoes and accessories.',
      image: '/fashion.png',
      route: 'Fashion',
    },
    {
      name: 'Home & Living',
      description: 'Everything you need for your home.',
      image: '/home.png',
      route: 'Home & Living',
    },
    {
      name: 'Beauty',
      description: 'Beauty products and personal care essentials.',
      image: '/beauty.png',
      route: 'Beauty',
    },
  ];

  features: Feature[] = [
    {
      title: 'Wide Selection',
      description: 'Shop from hundreds of products across categories you love.',
      icon: 'fa-solid fa-bag-shopping',
    },
    {
      title: 'Secure Shopping',
      description: 'Your account and shopping experience are protected from start to finish.',
      icon: 'fa-solid fa-shield-halved',
    },
    {
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and conveniently to your doorstep.',
      icon: 'fa-solid fa-truck-fast',
    },
    {
      title: 'Easy Payments',
      description: 'Enjoy a simple and convenient checkout experience.',
      icon: 'fa-solid fa-credit-card',
    },
  ];

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: {
        category,
      },
    });
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
