import { AsyncPipe, NgIf } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartResponse } from '../../../core/models/data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, FontAwesomeModule, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  cartService = inject(CartService);
  
  faCartIcon = faCartShopping;
  faBarsIcon = faBars;
  faTimesIcon = faTimes;

  isMenuOpen = false;

count!: number;

constructor() {

  effect(() => {
    this.count = this.cartService.cartItemQuantity$();
  })
}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  } 
}
