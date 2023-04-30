import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Cart } from '../cart.model';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent {

  items!: Cart[];
  constructor(private router: Router, private cartService: CartService) {}


  ngOnInit() {
    this.cartService.getAllItems().subscribe((data) => {
      this.items = data;
    })
  }
  goBack() {
    this.router.navigate(['/customer/1']);
  }
}
