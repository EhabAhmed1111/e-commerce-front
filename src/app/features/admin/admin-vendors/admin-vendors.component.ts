import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { VendorComponent } from '../../home/vendor/vendor.component';

@Component({
  selector: 'app-admin-vendors',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, VendorComponent],
  templateUrl: './admin-vendors.component.html',
  styleUrl: './admin-vendors.component.scss'
})
export class AdminVendorsComponent {

}
