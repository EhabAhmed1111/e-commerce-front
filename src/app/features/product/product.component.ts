import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../core/services/product/product.service';
import { ProductsResponse, Products, ProductsForShow, CategoriesResponse, Category } from '../../core/models/data';
import { CategoryService } from '../../core/services/category/category.service';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  /*---- this will not be modified -----*/
  products: ProductsForShow[] = [];
  categories: Category[] = [];


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService
      .fetchProducts()
      .subscribe((products: ProductsResponse) => {
        /*------ this return list of products and mapping it to new Product ------*/
        this.products = products.data.map((product: Products): ProductsForShow => {
          /*------ here we got thumbnail if it null we use default one--------*/
          const thumbnail = product.medias.find(media => media.coverImage)?.url ?? "https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png";

          return {
            ...product,
            thumbnail
          };
        });
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((category: CategoriesResponse): void => {
      this.categories = category.data;
    })
  }

}
