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
  totalcost=0;

  constructor(private router: Router, private cartService: CartService) {}


  ngOnInit() {
    this.cartService.getAllItems().subscribe((data) => {
      this.items = data;
      this.totalcost = this.items.reduce((total, item) => total+item.totalprice, 0);
    });
  }

  goBack() {
    this.router.navigate(['/customer/1']);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }

  removeItem(items: Cart) {
    if (confirm('Are you sure you want to delete this food item?')) {
        this.cartService.deleteItem(items.id).subscribe(res => {
          this.cartService.getAllItems().subscribe((data) => {
            this.items = data;
          })
          alert("Item removed from cart!")
        }, err => {
          alert("Something went wrong")
        })
    }
  }

  buynow() {
    if(confirm('Are you sure want to proceed?')) {
      this.cartService.addOrderEntries(this.items).subscribe(() => {
        this.clearCartEntries()
      }, err => {
        alert("Something went wrong!")
      })
    }
  }

  private clearCartEntries() {
    this.cartService.clearCartEntries().subscribe(res => {
      alert("Order successfully placed!")
      this.items = [];
    }, err => {
      alert('Something went wrong')
    });
  } 
}
