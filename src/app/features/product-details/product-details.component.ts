import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products, ProductsForVendorForShow, ProductsForVendorResponse, Review, ReviewResponse, ReviewResponseForAddReview, SingleProductResponse, WishlistResponse, WishlistResponseForCheck } from '../../core/models/data';
import { find } from 'rxjs';
import { faHeart, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ReviewsService } from '../../core/services/reviews/reviews.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
import { JwtService } from '../../core/services/auth/jwt/jwt.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, FaIconComponent, HeaderComponent, FooterComponent, FormsModule, NgFor, NgClass, SidebarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  /* for using custom element tags */
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent {
  faHeart = faHeart;
  product: Products = {} as Products;
  products: ProductsForVendorForShow[] = [];
  selectedImage: string = '';
  thumbnail: string = '';
  faUser = faUser;
  reviews: Review[] = [];
  // this for review
stars = Array(5).fill(faStar);
productId: string = '';
review: Review = {} as Review;
isReviewButtonLoading: boolean = false;
isOwner: boolean = false;
quantity = 0;
isFavorite = signal(false);


  constructor(private router: ActivatedRoute, private productService: ProductService, private reviewService: ReviewsService, private jwtService: JwtService, private cartService: CartService,
    private wishlistService: WishlistService
  ) { }
  // here we will make api req and we will remove the var we make it direct
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
      this.productService.fetchSingleProduct(params.get('id')!).subscribe((product: SingleProductResponse) => {
        this.product = product.data;
        this.selectedImage = this.product.medias[0].url;
        if(this.product.vendor.email === this.jwtService.getEmailFromToken()) {
          this.isOwner = true;
        }

        /* here we will get all products with thumbnail for this vendor */
        /* here we map to get thumbnail and filter to remove the current product */
        this.productService.fetchProductsByVendorId(this.product.vendor.id).subscribe((products: ProductsForVendorResponse) => {
          this.products = products.data.map((productData) => {
            this.thumbnail = productData.medias.find((media) => media.coverImage)?.url ?? "https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png";
            return { ...productData, thumbnail: this.thumbnail }
          }).filter((productData) => productData.id !== this.product.id);
        });

      })

      this.reviewService.getReviews(params.get('id')!).subscribe((ReviewResponse: ReviewResponse) => {
        this.reviews = ReviewResponse.data;
        console.log('Reviews data:', this.reviews);
      })

      this.wishlistService.checkIsFavorite(params.get('id')!).subscribe((response: WishlistResponseForCheck) => {
        console.log(response.data);
        
        this.isFavorite.set(response.data);
        console.log(this.isFavorite());
        
      })
    });

  }

  selectImage(mediaUrl: string) {
    this.selectedImage = mediaUrl;
  }


  isAddReviewModalOpen: boolean = false;
  comment: string = '';
  rating: number = 0;

  toggleAddReviewModal() {
    this.isAddReviewModalOpen = !this.isAddReviewModalOpen;
}

submitReview() {
  this.isReviewButtonLoading = true;
  // todo see if there is another way to handle error in subscribe method
  this.reviewService.addReviews(this.productId, {rating: this.rating, content: this.comment}).subscribe((review: ReviewResponseForAddReview) => {
    this.reviews.push(review.data);
    this.isReviewButtonLoading = false;
  }, (error) => {
    console.log(error); 
    this.isReviewButtonLoading = false;
  })
  this.isAddReviewModalOpen = !this.isAddReviewModalOpen;

}

setRating(rating: number) {
  this.rating = rating;
}


  /**todo finsish this entire screen  */


  addToCart(productId: string, qunatity: number) {
      this.cartService.addToCart(productId, qunatity).subscribe((cart) => {
        console.log(cart);
      })
      
  }


  favoriteButtonOnClick(productId: string) {
    console.log(this.isFavorite());
    
    if(this.isFavorite()) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

    addToWishlist(productId: string) {
    this.wishlistService.addToWishlist(productId).subscribe((response: WishlistResponse) => {
      console.log(response.data.count);
      this.isFavorite.set(true);
    })
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe((response: WishlistResponse) => {
      console.log(response.data.count);
      this.isFavorite.set(false);
    })
  }
}
