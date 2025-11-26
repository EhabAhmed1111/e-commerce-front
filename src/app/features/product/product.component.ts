import { Component, effect, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../core/services/product/product.service';
import { ProductsResponse, Products, ProductsForShow, CategoriesResponse, Category } from '../../core/models/data';
import { CategoryService } from '../../core/services/category/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  /*---- this will not be modified -----*/
  products: ProductsForShow[] = [];
  filteredProducts: ProductsForShow[] = [];
  categories: Category[] = [];
  /** shoud it become signal?? */
  searchText: string = "";
  category: string = "";

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

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
    });
  }

  onSearchChange(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.filterProductsBySearchText(this.searchText);
  }

  // if there is no product out of filter then the original products will be shown
  onSelectCategoryChange(event: Event) {
    this.category = (event.target as HTMLSelectElement).value;
    /* if there are search text i should filter it 2 time first by category then by search text */
    if (this.searchText.length > 0) {
      /* here we apply search text only */
      if (this.category === "All") {
        this.filteredProducts = this.filterProductsBySearchText(this.searchText);
      }
      this.filteredProducts = this.filterProductsByCategoryAndSearchText(this.category, this.searchText);
    } else {
      this.filteredProducts = this.filterProductsByCategory(this.category);
    }
  }

  private filterProductsByCategory(categoryName: string): ProductsForShow[] {
    return this.products.filter((product: ProductsForShow) => {
      return product.categoryName === categoryName;
    });
  }
  private filterProductsBySearchText(productName: string): ProductsForShow[] {
    return this.products.filter((product: ProductsForShow) => {
      return product.productName.toLowerCase().includes(productName.toLocaleLowerCase());
    });
  }

  private filterProductsByCategoryAndSearchText(categoryName: string, productName: string): ProductsForShow[] {
    return this.products.filter((product: ProductsForShow) => {
      return product.categoryName === categoryName && product.productName.toLowerCase().includes(productName.toLocaleLowerCase());
    });
  }
}
