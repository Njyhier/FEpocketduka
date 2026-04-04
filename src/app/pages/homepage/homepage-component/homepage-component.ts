import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-component',
  imports: [],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  private router: Router = inject(Router);
  navigateToProducts() {
    this.router.navigate(['products']);
  }
}
