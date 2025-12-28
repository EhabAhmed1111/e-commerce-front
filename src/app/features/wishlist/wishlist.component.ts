import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { WishlistResponse, ProductsForCart } from '../../core/models/data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faCartPlus, faHeartBroken, faStar } from '@fortawesome/free-solid-svg-icons';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, FontAwesomeModule, SidebarComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private wishlistService = inject(WishlistService);

  wishlistItems: ProductsForCart[] = [];
  isLoading = true;
  
  faTrash = faTrash;
  faCartPlus = faCartPlus;
  faHeartBroken = faHeartBroken;
  faStar = faStar;

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.isLoading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlistItems = response.data.productResponseSet.map((item) => {
          return{
            ...item,
            thumbnail: item.medias.find((media) => media.coverImage)?.url ?? "https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png"
          }
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        this.isLoading = false;
      }
    });
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
      },
      error: (error) => {
        console.error('Error removing from wishlist:', error);
      }
    });
  }
}
