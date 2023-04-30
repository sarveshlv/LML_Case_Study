import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { Vendor } from '../vendor.model';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLoggedIn = false;
  vendors!: Vendor[];

  constructor(private authService: AuthService, private router: Router, private vendorService: VendorService) {}

  ngOnInit() {
    // check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();

    // redirect to login component if the user is not logged in
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    //get vendors from json using vendor service 
    this.vendorService.getAllVendors().subscribe((data) => {
      this.vendors = data;
    })
  }

  //to view all details of a particular vendor 
  viewDetails(vendor: Vendor): void {
    const url = `/viewvendordetails/${vendor.id}`;
    this.router.navigateByUrl(url);
  }

  //block the vendor
  blockVendor(vendor: Vendor): void {
    this.vendorService.blockVendor(vendor).subscribe(() => {
      vendor.status = 'blocked';
    });
  }

  unblockVendor(vendor: Vendor): void {
    this.vendorService.unblockVendor(vendor).subscribe(() => {
      vendor.status = 'active';
    });
  }

  logout() {
    this.authService.logout();
    // redirect to login component after logout
    this.router.navigate(['/login']);
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
