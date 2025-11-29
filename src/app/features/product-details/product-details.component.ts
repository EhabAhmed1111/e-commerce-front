import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products, SingleProductResponse } from '../../core/models/data';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  /* for using custom element tags */
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent {
  product: Products = {} as Products;
  selectedImage: string = '';


  constructor(private router: ActivatedRoute, private productService: ProductService) { }
  // here we will make api req and we will remove the var we make it direct
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.productService.fetchSingleProduct(params.get('id')!).subscribe((product: SingleProductResponse) => {
        this.product = product.data;
        this.selectedImage = this.product.medias[0].url;
      })
    });
  }

  selectImage(mediaUrl: string) {
    this.selectedImage = mediaUrl;
  }

  /**todo finsish this entire screen  */
}
