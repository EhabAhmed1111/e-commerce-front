import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: "header",
    component: HeaderComponent
  },{
    path: "",
    component: HomeComponent
  },{
    path: "signup",
    loadComponent: () => import('./signup/signup.component').then((c)=>c.SignupComponent)
  },{
    path: "topseller",
    loadComponent: () => import('./topseller/topseller.component').then((c)=>c.TopsellerComponent)
  },{
    path: "cart",
    loadComponent: () => import('./cart/cart.component').then((c)=>c.CartComponent)
  }
];
