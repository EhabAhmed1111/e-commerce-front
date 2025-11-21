import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/data';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
/*---- this will not be modified -----*/
  products: Product[] = []  

constructor(private productService: ProductService) {}

ngOnInit() {
  this.products = this.productService.getProuctsFromApi()

}

// getProuct() {
// }
}
