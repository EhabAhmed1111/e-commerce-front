import { Component } from '@angular/core';
import { JwtService } from '../../../core/services/auth/jwt/jwt.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  faArrow = faArrowRight;
  isSidebarOpen: boolean = false;
  role: string | null = null;
  constructor(private jwtService: JwtService) {
    this.role = this.jwtService.getRoleFromToken()!;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.faArrow = this.isSidebarOpen ? faArrowLeft : faArrowRight;
  }

}
