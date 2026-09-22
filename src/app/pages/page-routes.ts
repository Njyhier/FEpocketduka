import { Routes } from '@angular/router';
import { MainPageComponent } from './mainPage/main-page-component/main-page-component';
import { adminGuard } from '../guards/auth-guard-guard';

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
        path: 'userdetails/:user_id',
        loadComponent: () =>
          import('./user/user-profile-component/user-profile-component').then(
            (m) => m.UserProfileComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./user/user-profile-component/user-profile-component').then(
            (m) => m.UserProfileComponent,
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
        path: 'products/:product_id',
        loadComponent: () =>
          import('./productdetails/product-details-component/product-details-component').then(
            (m) => m.ProductDetailsComponent,
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
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./admin/admin-page-component/admin-page-component').then(
            (m) => m.AdminPageComponent,
          ),

        children: [
          {
            path: '',
            redirectTo: 'orders',
            pathMatch: 'full',
          },

          {
            path: 'orders',
            loadComponent: () =>
              import('./admin/children/orders/orders-component/orders-component').then(
                (m) => m.OrdersComponent,
              ),
          },

          {
            path: 'addproduct',
            loadComponent: () =>
              import('./admin/children/addproduct/add-product-component/add-product-component').then(
                (m) => m.AddProductComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./landing/landing-page-component/landing-page-component').then(
        (m) => m.LandingPageComponent,
      ),
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/sign-up-component/sign-up-component').then((m) => m.SignUpComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/loginpage-component/loginpage-component').then((m) => m.LoginpageComponent),
  },
];
