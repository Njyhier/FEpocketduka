import { Component, signal } from '@angular/core';

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
}
