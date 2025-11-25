import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent)

  }, {
    path: "product",
    loadComponent: () => import('./features/product/product.component').then((c) => c.ProductComponent)
  },
  {
    path: "auth",
    loadChildren: () => import('./features/auth/auth.module').then((c) => c.AuthModule)
  },
  {
    path: "**",
    redirectTo: ''
  }
];
