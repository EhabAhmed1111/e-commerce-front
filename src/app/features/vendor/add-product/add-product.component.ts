import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../core/models/data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  @Output() isFormOpen = new EventEmitter<boolean>();
constructor(private categoryService: CategoryService, private productService: ProductService) {}
categories: Category[] = [];

productForm: FormGroup = new FormGroup({
  productName: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required]),
  brand: new FormControl('', [Validators.required]),
  amount: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  categoryName: new FormControl('', [Validators.required]),
})

ngOnInit() {
  this.categoryService.getAllCategories().subscribe((res) => {
    this.categories = res.data;
  })
}
onSubmit() {
  this.productService.addProduct(this.productForm.value).subscribe((res) => {
    console.log(res);
    this.isFormOpen.emit(false);

  })
}

}
