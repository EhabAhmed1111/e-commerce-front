import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import {
  Products,
  ProductsForShow,
  ProductsResponse,
} from '../../../core/models/data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-product',
  imports: [RouterLink],
  templateUrl: './home-product.component.html',
  styleUrl: './home-product.component.scss',
})
export class HomeProductComponent {
  products: ProductsForShow[] = [];
  thumbnail: string | null = null;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .fetchProducts()
      .subscribe((productResponse: ProductsResponse) => {
        this.products = productResponse.data.map((product) => {
          this.thumbnail =
            product.medias.find((media) => media.coverImage)?.url ??
            'https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png';
          return {
            ...product,
            thumbnail: this.thumbnail,
          };
          // sort products by avgRate and then take first 8 products
        }).sort((a, b) => (b.avgRate ?? 0) - (a.avgRate ?? 0)).slice(0, 8);
      });
  }
}
