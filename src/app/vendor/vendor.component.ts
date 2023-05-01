import { Component } from '@angular/core';
import { Vendor } from '../vendor.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VendorService } from '../vendor.service';
import { FoodItem } from '../fooditem.model';



@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {

  vendor!: Vendor;
  selectedFoodItem! : FoodItem;
  showEditForm: boolean = false;
  fooditem!: FoodItem;

  constructor(private route: ActivatedRoute, private http: HttpClient, private vendorService: VendorService) {}

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.vendorService.getVendorById(id).subscribe((data) => {
      this.vendor = data;
    });
  }

  editFoodItem(fooditem: FoodItem) {
    this.selectedFoodItem = fooditem;
    this.showEditForm = true;
  }

  saveFoodItem() {
    const id = this.route.snapshot.params['id']; 
    const itemid = this.route.snapshot.params['itemid'];
    this.vendorService.updateVendorFoodItem(id, itemid, this.selectedFoodItem).subscribe(res => {
      alert("Done")
    });
    this.showEditForm = false;
  }


  cancelEdit() {
    this.showEditForm = false;
  }

  removeFoodItem(fooditem: FoodItem) {
    const id = this.route.snapshot.params['id']; 
    if (confirm('Are you sure you want to delete this food item?')) {
      this.vendorService.deleteFoodItem(id, fooditem).subscribe(() => {
        const index = this.vendor.fooditems.findIndex(item => item.itemid === fooditem.itemid);
      if(index !== -1) {
        this.vendor.fooditems.splice(index,1);
      }
      })
    }
  }

  onCategorySelected(event: any) {
    const category = event.target.value;
    if (category === 'All') {
      // If no category is selected, show all food items
      const id = this.route.snapshot.params['id'];
      this.vendorService.getVendorById(id).subscribe((data) => {
        this.vendor = data;
      });
    } else {
      // Otherwise, filter the food items by category
      this.filterFoodItemsByCategory(category);
    }
  }

  filterFoodItemsByCategory(category: string) {
    const id = this.route.snapshot.params['id'];
    this.vendorService.getFoodItemsByCategory(id,category).subscribe(data => {
      const filteredItems = data.fooditems.filter((item: { category: string; }) => item.category === category);
      this.vendor.fooditems = filteredItems;
    });
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
