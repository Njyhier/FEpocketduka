import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/mainPage/main-page-component/main-page-component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    loadChildren: () => import('./pages/page-routes').then((m) => m.pageRoutes),
  },
];
