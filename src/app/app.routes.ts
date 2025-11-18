import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

export const routes: Routes = [
{
    path: "",
    loadComponent: () => import('./features/home/home.component').then((c)=>c.HomeComponent)

  },{
    path: "**",
    redirectTo: ''
  }
];
