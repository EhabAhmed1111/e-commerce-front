import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products, ProductsForVendorForShow, ProductsForVendorResponse, SingleProductResponse } from '../../core/models/data';
import { find } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  /* for using custom element tags */
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent {
  product: Products = {} as Products;
  products: ProductsForVendorForShow[] = [];
  selectedImage: string = '';
  thumbnail: string = '';
  faUser = faUser;


  constructor(private router: ActivatedRoute, private productService: ProductService) { }
  // here we will make api req and we will remove the var we make it direct
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.productService.fetchSingleProduct(params.get('id')!).subscribe((product: SingleProductResponse) => {
        this.product = product.data;
        this.selectedImage = this.product.medias[0].url;

        /* here we will get all products with thumbnail for this vendor */
        /* here we map to get thumbnail and filter to remove the current product */
        this.productService.fetchProductsByVendorId(this.product.vendor.id).subscribe((products: ProductsForVendorResponse) => {
          this.products = products.data.map((productData) => {
            this.thumbnail = productData.medias.find((media) => media.coverImage)?.url ?? "https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png";
            return { ...productData, thumbnail: this.thumbnail }
          }).filter((productData) => productData.id !== this.product.id);
        });

      })
    });

  }

  selectImage(mediaUrl: string) {
    this.selectedImage = mediaUrl;
  }

  /**todo finsish this entire screen  */
}
