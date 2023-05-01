import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { Vendor } from '../vendor.model';
import { FoodItem } from '../fooditem.model';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customer!: Customer;
  vendor!: Vendor;
  fooditems!:FoodItem;
  selectedQuantity: number = 1;

  constructor(private route: ActivatedRoute, 
    private http: HttpClient, 
    private vendorService: VendorService, 
    private customerService: CustomerService,
    private router: Router,
    private cartService: CartService) {}

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.customerService.getCustomerById(id).subscribe((data) => {
      this.customer = data;
    });

    this.getVendorDetails();
  }

  getVendorDetails() {
    const id=1;;
    this.vendorService.getVendorById(id).subscribe((data) => {
      this.vendor = data;
    });
  }

  addToCart(fooditem: FoodItem) {
    const from = document.getElementById("fromdate-" + fooditem.itemid) as HTMLInputElement;
    const fdate = from.value;
    const to = document.getElementById("todate-" + fooditem.itemid) as HTMLInputElement;
    const tdate = to.value;

    if(!fdate || !tdate) {
      alert("Please select From and To date");
      return;
    }

    const cartItem = {
      itemid: fooditem.itemid,
      itemname: fooditem.itemname,
      quantity: this.selectedQuantity,
      fromdate: fdate,
      todate: tdate,
      totalprice: fooditem.price * this.selectedQuantity,
      id: 0
    };

    this.cartService.addItemToCart(cartItem);
  
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }
  viewCart() {
    this.router.navigate(['/viewcart']);
  }

  toggleDropdown(): void {
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent?.classList.toggle("show");
  }

  closeDropdown(event: { target: { matches: (arg0: string) => any; }; }): void {
    if (!event.target.matches('.dropdown-button')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var dropdownContent = dropdowns[i];
        if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
        }
      }
    }
  }
}
