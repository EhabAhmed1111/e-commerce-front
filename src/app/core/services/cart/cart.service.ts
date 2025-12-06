import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal to hold cart items
  cartItems = signal<CartItem[]>([]);

  // Computed signal for total items count
  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  // Computed signal for total price
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  constructor() {
    // Initialize with some dummy data for testing
    this.cartItems.set([
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.50,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
      }
    ]);
  }

  addToCart(item: CartItem) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

  removeFromCart(itemId: number) {
    this.cartItems.update(items => items.filter(i => i.id !== itemId));
  }

  updateQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    this.cartItems.update(items => items.map(i => i.id === itemId ? { ...i, quantity } : i));
  }
}
