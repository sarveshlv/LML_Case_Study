import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor.model';
import { Observable, switchMap, tap } from 'rxjs';
import { FoodItem } from './fooditem.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = 'http://localhost:3000/vendors';

  constructor(private http: HttpClient) {}

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl);
  }

  getVendorById(id: number): Observable<Vendor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Vendor>(url);
  }

  blockVendor(vendor: Vendor): Observable<Vendor> {
    vendor.status = 'blocked';
    const url = `${this.baseUrl}/${vendor.id}`;
    return this.http.put<Vendor>(url, vendor);
  }

  unblockVendor(vendor: Vendor): Observable<Vendor> {
    vendor.status = 'active';
    const url = `${this.baseUrl}/${vendor.id}`;
    return this.http.put<Vendor>(url, vendor);
  }

  getVendorFoodItems(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.baseUrl}/${id}/fooditems`);
  }

  updateVendorFoodItem(id: number, itemid: number, updatedFoodItem: FoodItem): Observable<any> {
    return this.http.put<FoodItem>(`${this.baseUrl}/${id}?fooditems?itemid=${itemid}`, updatedFoodItem);
  }

  deleteFoodItem(id: number, fooditem: FoodItem): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/fooditems?itemid=${fooditem.itemid}`);
  }

  addFoodItem(vendor: Vendor) {
    return this.http.post(this.baseUrl,vendor);
  }

  getFoodItemsByCategory(id: number,category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}?fooditems?category=${category}`);
  }
  
}
