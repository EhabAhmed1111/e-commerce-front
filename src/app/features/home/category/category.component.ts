import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CategoriesResponse, Category } from '../../../core/models/data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
constructor(private categoryService: CategoryService) {}

categories: Category[] = [];

ngOnInit() {
  this.categoryService.getAllCategories().subscribe((categoriesResponse: CategoriesResponse) => {
    this.categories = [...categoriesResponse.data];
  })
}
}
