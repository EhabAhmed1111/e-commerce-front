import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CategoryComponent } from '../category/category.component';
import { HomeProductComponent } from '../home-product/home-product.component';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CategoryComponent, HomeProductComponent, HeroBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
