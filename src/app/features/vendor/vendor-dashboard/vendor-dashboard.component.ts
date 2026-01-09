import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { OrderService } from '../../../core/services/order/order.service';
import { OrderItemsResponseData } from '../../../core/models/data';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ProductService } from '../../../core/services/product/product.service';
import { getMonthName } from '../../../shared/utils/Utils';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-vendor-dashboard',
  imports: [
    SidebarComponent,
    HeaderComponent,
    BaseChartDirective,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss',
})
export class VendorDashboardComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}
  orders: OrderItemsResponseData[] = [];
  totalProfits: number = 0;
  activeProducts: number = 0;

  monthlyProfits: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Monthly Profits',
      },
    },
  };

  public barChartData: ChartData<'bar'> = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [],
        label: 'Profits ($)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  ngOnInit(): void {
    this.orderService.getOrdersForCurrentVendor().subscribe((res) => {
      this.orders = res.data;

      this.orders.forEach((order) => {
        const date = new Date(order.createdAt);
        // it will start from 0 to 11 so it will start from january
        this.monthlyProfits[date.getMonth()] += order.totalPrice;
      });

      /* this will change to get the profit from order that already complete not all  */
      this.totalProfits = this.orders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      // Update chart data
      this.barChartData.datasets[0].data = this.monthlyProfits;
      // Trigger update if needed, but with simple data binding it should work.
      // We might need to create a new object reference to trigger change detection for the chart
      this.barChartData = {
        ...this.barChartData,
        datasets: [
          {
            ...this.barChartData.datasets[0],
            data: this.monthlyProfits,
          },
        ],
      };
    });
    this.productService.fetchProductForCurrentVendor().subscribe((res) => {
      this.activeProducts = res.data.reduce(
        (acc, product) => acc + product.amount,
        0
      );
    });
  }
}

// export type MONTH =
//   | 'January'
//   | 'February'
//   | 'March'
//   | 'April'
//   | 'May'
//   | 'June'
//   | 'July'
//   | 'August'
//   | 'September'
//   | 'October'
//   | 'November'
//   | 'December';