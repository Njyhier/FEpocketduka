import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page-component';
export const adminRoutes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin-page-component').then((m) => m.AdminPageComponent),
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../children/orders/orders-component/orders-component').then(
            (m) => m.OrdersComponent,
          ),
      },
      {
        path: 'addproduct',
        loadComponent: () =>
          import('../children/addproduct/add-product-component/add-product-component').then(
            (m) => m.AddProductComponent,
          ),
      },
    ],
  },
];
