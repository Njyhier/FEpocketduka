import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-page-component.html',
  styleUrl: './admin-page-component.css',
})
export class AdminPageComponent {
  private router: Router = inject(Router);
  goToOrders() {
    this.router.navigate(['orders']);
  }
}
