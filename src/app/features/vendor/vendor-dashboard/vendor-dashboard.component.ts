import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { OrderService } from '../../../core/services/order/order.service';
import { OrderItemsResponseData } from '../../../core/models/data';

@Component({
  selector: 'app-vendor-dashboard',
  imports: [SidebarComponent],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent {
constructor(private orderService: OrderService) {}
orders: OrderItemsResponseData[] = [];
ngOnInit(): void {
  this.orderService.getOrdersForCurrentVendor().subscribe((res) => {
    this.orders = res.data;
  })
}
}
