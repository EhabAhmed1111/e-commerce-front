import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-failure.component.html',
  styleUrl: './payment-failure.component.scss'
})
export class PaymentFailureComponent {}
