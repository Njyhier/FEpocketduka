import { Routes } from '@angular/router';
import { MainPageComponent } from './mainPage/main-page-component/main-page-component';
export const pageRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full',
      },
      {
        path: 'homepage',
        loadComponent: () =>
          import('./homepage/homepage-component/homepage-component').then(
            (m) => m.HomepageComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/loginpage-component/loginpage-component').then(
            (m) => m.LoginpageComponent,
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./signup/sign-up-component/sign-up-component').then((m) => m.SignUpComponent),
      },
      {
        path: 'productdetails/:product_id',
        loadComponent: () =>
          import('./productdetails/product-details-component/product-details-component').then(
            (m) => m.ProductDetailsComponent,
          ),
      },
      {
        path: 'userdetails/:user_id',
        loadComponent: () =>
          import('./userDetails/user-details-component/user-details-component').then(
            (m) => m.UserDetailsComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/productspage-component/productspage-component').then(
            (m) => m.ProductspageComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../components/cart/cart-component/cart-component').then((m) => m.CartComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders-component/orders-component').then((m) => m.OrdersComponent),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin-page-component/admin.routes').then((m) => m.adminRoutes),
      },
    ],
  },
];
