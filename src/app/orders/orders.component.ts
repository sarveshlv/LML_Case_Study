import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrdersService } from '../orders.service';
import { Orders } from '../orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  items: Orders[] = [];
  constructor(private router: Router, private cartService: CartService, private orderService: OrdersService) {}

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((data) => {
      for(let i=0; i<data.length; i++) {
        this.items = data[i];
      }
    })
  }

  goBack() {
    this.router.navigate(['/customer/1']);
  }
}
