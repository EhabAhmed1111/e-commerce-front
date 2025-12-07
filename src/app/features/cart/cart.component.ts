import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrash,
  faPlus,
  faMinus,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../core/services/cart/cart.service';
import {
  Cart,
  CartResponse,
  Products,
  ProductsForVendorForShow,
} from '../../core/models/data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);

  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  faArrowLeft = faArrowLeft;
  cart: Cart = {} as Cart;
  // product: ProductsForVendorForShow = {} as ProductsForVendorForShow;
  totalCartItems$ = this.cartService.getTotalQuantity();
  ngOnInit() {
    this.cartService.getCart().subscribe((cart: CartResponse) => {
      this.cart = cart.data;
      this.cart.cartItemsDto = this.cart.cartItemsDto.map((item) => ({
        ...item,
        productResponse: {
          ...item.productResponse,
          thumbnail:
            item.productResponse.medias.find((media) => media.coverImage)
              ?.url ??
            'https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png',
        },
      }));
    });
  }

  removeFromCart(itemId: string) {
   
  }

  updateQuantity(itemId: string, quantity: number) {
    
  }
}
