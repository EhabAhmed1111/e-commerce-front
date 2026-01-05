import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProductService } from '../../../core/services/product/product.service';
import { ProductsForShow } from '../../../core/models/data';
import { RouterLink } from '@angular/router';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-vendor-product',
  imports: [HeaderComponent, FooterComponent, RouterLink, SidebarComponent, AddProductComponent],
  templateUrl: './vendor-product.component.html',
  styleUrl: './vendor-product.component.scss'
})
export class VendorProductComponent {

products: ProductsForShow[] = [];

constructor(private productService: ProductService) {}

isAddProductFormOpen: boolean = false;

ngOnInit() {
  this.productService.fetchProductForCurrentVendor().subscribe((res) => {
    this.products = res.data.map(product => {
      const thumbnail = product.medias.find(media => media.coverImage)?.url??"https://res.cloudinary.com/dpc0ohu0g/image/upload/v1763827794/ecommerce/products/images/1c9d41ad-1beb-4b11-b089-02c4c44b8a17.png";

      return {
       ...product,
       thumbnail
      };
    });
  })
}

openAddProductForm() {
  this.isAddProductFormOpen = true;
}

closerAddProductForm(isFormOpen: boolean) {
  this.isAddProductFormOpen = isFormOpen;
}

removeProduct(id: string) {
this.productService.deleteProduct(id).subscribe(() => {
  this.products = this.products.filter(product => product.id !== id);
})
}
}
