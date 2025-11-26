import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products, SingleProductResponse } from '../../core/models/data';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: Products = {} as Products;

  constructor(private router: ActivatedRoute, private productService: ProductService) { }
  // here we will make api req and we will remove the var we make it direct
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.productService.fetchSingleProduct(params.get('id')!).subscribe((product: SingleProductResponse) => {
        this.product = product.data;
      })
    });
  }
}
