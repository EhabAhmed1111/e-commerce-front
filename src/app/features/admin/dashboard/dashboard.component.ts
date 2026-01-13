import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { OrderResponseData } from '../../../core/models/data';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  orderResponse: OrderResponseData[] = [];
  totalUsers: number = 0;
  totalProducts: number = 0;
  totalProfit: number = 0;
  totalPendingOrders: number = 0;
  currentMonthProfits: number = 0;
  lastMonthProfits: number = 0;
  moMGrowth: number = 0;
  avgOrderValue: number = 0;

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
  
  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe((res) => {
      this.orderResponse = res.data.orderResponses.map(order => ({
        ...order,
        createdAt: new Date(order.createdAt)
      }));
      this.totalUsers = res.data.totalUsers;
      this.totalProducts = res.data.totalProducts;
      this.totalProfit = this.calculateTotalOrdersProfits(this.orderResponse);
      this.totalPendingOrders = this.calculateTotalPendingOrders(this.orderResponse);
      this.currentMonthProfits = this.calculateCurrentMonthProfits(this.orderResponse);
      this.lastMonthProfits = this.calculateLastMonthProfits(this.orderResponse);
      this.moMGrowth = this.calculateMoMGrowth(this.currentMonthProfits, this.lastMonthProfits);
      this.avgOrderValue = this.calculateAvgOrderValue(this.orderResponse);

      this.initChartData();
    });
  }

  initChartData() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // console.log(currentYear);
    const monthsInYear = 12;
    
    const data = new Array(monthsInYear).fill(0);

    this.orderResponse.forEach(order => {
      // data.fill(1000)
      if (order.orderStatus === 'DELIVERED' && 
          order.createdAt.getFullYear() === currentYear) {
        const month = order.createdAt.getMonth();
        data[month] += order.totalPrice;
      }
    });

    this.barChartData = {
      ...this.barChartData,
      datasets: [
        {
          data: data,
          label: 'Monthly Profit ($)',
          borderColor: 'rgba(75, 192, 192, 0.6)',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  }

  calculateTotalOrdersProfits(orderResponse: OrderResponseData[]): number {
    let totalProfit: number = 0;
    orderResponse.forEach((order) => {
      if (order.orderStatus === 'DELIVERED') {
        totalProfit += order.totalPrice;
      }
    });

    return totalProfit;
  } 
  calculateTotalPendingOrders(orderResponse: OrderResponseData[]): number {
    let totalPendingOrders: number = 0;
    orderResponse.forEach((order) => {
      if (order.orderStatus === 'PENDING') {
        totalPendingOrders += 1;
      }
    });

    return totalPendingOrders;
  }
   calculateCurrentMonthProfits(orderResponse: OrderResponseData[]): number {
    let totalCurrentMonthProfits: number = 0;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    orderResponse.forEach((order) => {
      if (order.orderStatus === 'DELIVERED' && order.createdAt.getMonth() === currentMonth) {
        totalCurrentMonthProfits += order.totalPrice;
      }
    });

    return totalCurrentMonthProfits;
  } 
  
  calculateLastMonthProfits(orderResponse: OrderResponseData[]): number {
    let totalLastMonthProfits: number = 0;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    orderResponse.forEach((order) => {
      if (order.orderStatus === 'DELIVERED' && order.createdAt.getMonth() === currentMonth-1) {
        totalLastMonthProfits += order.totalPrice;
      }
    });

    return totalLastMonthProfits;
  }

  calculateMoMGrowth(totalCurrentMonthProfits: number, totalLastMonthProfits: number): number {
    if (totalLastMonthProfits === 0) return 0;
    return ((totalCurrentMonthProfits - totalLastMonthProfits) / totalLastMonthProfits) * 100;
  }

  calculateAvgOrderValue(orderResponse: OrderResponseData[]): number {
    let totalDeliveredValue: number = 0;
    let deliveredCount = 0;
      orderResponse.forEach((order) => {
        if (order.orderStatus === 'DELIVERED') {
          totalDeliveredValue += order.totalPrice;
          deliveredCount++;
        }
      });
      
      if (deliveredCount === 0) return 0;
      return totalDeliveredValue / deliveredCount;
  }

  /* todo add Conversion Rate => its percent of customer or vendor who made specific active(you determine the threshold)
  */

}
