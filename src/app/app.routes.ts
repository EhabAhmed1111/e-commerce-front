import { Routes } from '@angular/router';

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
    path: "product/:id",
    loadComponent: () => import('./features/product-details/product-details.component').then((c) => c.ProductDetailsComponent)
  },
  {
    path: "**",
    redirectTo: ''
  }
];
