import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/main-home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./features/product/product.component').then(
        (c) => c.ProductComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((c) => c.AuthModule),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
  },
  {
    path: 'payment/success',
    loadComponent: () =>
      import(
        './features/payment/payment-success/payment-success.component'
      ).then((m) => m.PaymentSuccessComponent),
  },
  {
    path: 'payment/pending/:id',
    loadComponent: () =>
      import(
        './features/payment/payment-processing/payment-processing.component'
      ).then((m) => m.PaymentProcessingComponent),
  },
  {
    path: 'payment/failure',
    loadComponent: () =>
      import(
        './features/payment/payment-failure/payment-failure.component'
      ).then((m) => m.PaymentFailureComponent),
  },
  {
    path: 'my-products',
    loadComponent: () =>
      import('./features/vendor/vendor-product/vendor-product.component').then(
        (m) => m.VendorProductComponent
      ),
  },
  {
    path: 'vendor/dashboard',
    loadComponent: () =>
      import(
        './features/vendor/vendor-dashboard/vendor-dashboard.component'
      ).then((m) => m.VendorDashboardComponent),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'vendors',
    loadComponent: () =>
      import('./features/admin/admin-vendors/admin-vendors.component').then(
        (m) => m.AdminVendorsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
