import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, FontAwesomeModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faCartIcon = faCartShopping;
  faBarsIcon = faBars;
  faTimesIcon = faTimes;

  isMenuOpen = false;
  /**todo 
   * here i need to get back end api to get cart item count
   * but first i need to login and signup api first 
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

  }
}
