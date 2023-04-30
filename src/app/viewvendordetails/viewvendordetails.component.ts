import { Component } from '@angular/core';
import { Vendor } from '../vendor.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-viewvendordetails',
  templateUrl: './viewvendordetails.component.html',
  styleUrls: ['./viewvendordetails.component.css']
})
export class ViewvendordetailsComponent {

  vendor!: Vendor;

  constructor(private route: ActivatedRoute, private http: HttpClient, private vendorService: VendorService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.vendorService.getVendorById(id).subscribe((data) => {
      this.vendor = data;
    })
  }
}
