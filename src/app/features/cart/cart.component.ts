import { Component, effect, inject } from '@angular/core';
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
  CartItemDto,
  CartResponse,
  Products,
  ProductsForVendorForShow,
} from '../../core/models/data';
import { map, Observable } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { OrderService } from '../../core/services/order/order.service';
import { PaymentFormComponent } from '../payment/payment-form/payment-form.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, HeaderComponent, PaymentFormComponent],
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

  cartItemsDto: CartItemDto[] = [];
  // product: ProductsForVendorForShow = {} as ProductsForVendorForShow;
  // totalCartItems$ = this.cartService.getTotalQuantity();
  totalCartItems$!: number;

  clientSecret: string = '';
  paymentId: string = '';

  // isPaymentHidden: boolean = true;
  isPaymentPopupVisible: boolean = false;
  
  constructor(private orderService: OrderService) {
    effect(() => {
      this.totalCartItems$ = this.cartService.cartItemQuantity$();
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  private loadCart() {
    this.cartService.getCart().subscribe((cart: CartResponse) => {
      this.cart = cart.data;
      this.cartItemsDto = cart.data.cartItemsDto;
      this.cartItemsDto = this.cart.cartItemsDto.map((item) => ({
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
    this.cartService.removeCartItemFromCart(itemId).subscribe(() => {
      this.loadCart();
    });
  }

  updateQuantity(productId: string, item: CartItemDto) {
    console.log(item.quantity);

    this.cartService
      .updateQuantityOfItem(productId, item.quantity)
      .subscribe(() => {
        this.loadCart();
      });
  }
  clearCart() {
    // todo in future
    console.log('will impl soon');
  }

  onClick() {
    this.orderService.createOrder().subscribe((res) => {
      this.clientSecret = res.data.clientSecret
      this.paymentId = res.data.paymentId
      this.isPaymentPopupVisible = true
    });
  }

  incrementQuantity(item: CartItemDto) {
    // can't exceed the amount
    if (item.quantity === item.productResponse.amount) {
      return item.quantity;
    }
    return item.quantity++;
  }

  decrementQuantity(item: CartItemDto) {
    // stop on 1
    if (item.quantity === 1) {
      return item.quantity;
    }
    return item.quantity--;
  }
}
