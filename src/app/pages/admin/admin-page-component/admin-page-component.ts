import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-page-component',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './admin-page-component.html',
  styleUrl: './admin-page-component.css',
})
export class AdminPageComponent {
  private router: Router = inject(Router);
  showAside = false;
  goToOrders() {
    this.router.navigate(['admin/orders']);
  }
  goToAddProduct() {
    this.router.navigate(['admin/addproduct']);
  }
  toggleAside() {
    this.showAside = !this.showAside;
  }
}
