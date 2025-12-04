import { Component, effect, signal, Signal } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../core/services/product/product.service';
import { ProductsResponse, Products, ProductsForShow, CategoriesResponse, Category } from '../../core/models/data';
import { CategoryService } from '../../core/services/category/category.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, forkJoin, Subject, Subscription } from 'rxjs';

import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent, FooterComponent, FormsModule, RouterLink],
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
  category: string = "All";

  /** to make observable to the input */
  searchSubject: Subject<string> = new Subject<string>();

  /** this will used to add subscribtion to it  */
  private subscription: Subscription = new Subscription();

  
  constructor(private productService: ProductService, private categoryService: CategoryService,
     private router: ActivatedRoute) {
    }
    
    ngOnInit() {
// this.router.snapshot.queryParamMap.get('name');

// console.log(this.router.snapshot.queryParamMap.get('name'));
    this.router.queryParamMap.subscribe((params) => {
      // it get name if its null it will be all 
      this.category = params.get('name') || 'All';
    });
  
    this.loadData();
  }

  private loadData() {


    /** i need to make subscribtion */

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
        this.filteredProducts = [...this.products];
      });

    this.categoryService.getAllCategories().subscribe((category: CategoriesResponse): void => {
      this.categories = category.data;
    });



    this.subscription.add(
      this.searchSubject
        .pipe(
          debounceTime(300),
          // this for ignoring the value if it is the same
          distinctUntilChanged())
        .subscribe((searchText) => {
          this.searchText = searchText;
          this.applyFIlters();
        })
    )
  }



  private applyFIlters() {
    // if (this.category) {
    if (this.category !== "All") {
      if (this.searchText) {
        this.filteredProducts = this.filterProductsByCategoryAndSearchText(this.category, this.searchText);
      } else {
        this.filteredProducts = this.filterProductsByCategory(this.category);
      }
    }
    // } 
    else if (this.searchText) {
      this.filteredProducts = this.filterProductsBySearchText(this.searchText);
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  // this stuped search 
  /** todo: fix this filters */
  onSearchChange(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.filterProductsBySearchText(this.searchText);
    if (this.category.length > 0) {
      this.filteredProducts = this.filterProductsByCategoryAndSearchText(this.category, this.searchText);
    }
  }

  // if there is no product out of filter then the original products will be shown
  onSelectCategoryChange(event: Event) {
    this.category = (event.target as HTMLSelectElement).value;
    this.applyFIlters();
    /* if there are search text i should filter it 2 time first by category then by search text */
    // if (this.searchText.length > 0) {
    //   /* here we apply search text only */
    //   if (this.category === "All") {
    //     this.filteredProducts = this.filterProductsBySearchText(this.searchText);
    //   }
    //   this.filteredProducts = this.filterProductsByCategoryAndSearchText(this.category, this.searchText);
    // } else {
    //   this.filteredProducts = this.filterProductsByCategory(this.category);
    // }
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
