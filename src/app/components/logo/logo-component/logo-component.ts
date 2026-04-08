import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-component',
  standalone: true,
  imports: [],
  templateUrl: './logo-component.html',
  styleUrl: './logo-component.css',
})
export class LogoComponent {
  logo_image = signal('/logo.png');
  logo_text = 'Just a swipe';
  private router = inject(Router);
  goToHome() {
    this.router.navigate(['homepage']);
  }
}
