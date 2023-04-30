import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';
import { FoodItem } from './fooditem.model';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  fooditem!: FoodItem;

  private baseUrl = 'http://localhost:3000/customers';
  private cartUrl = 'http://localhost:3000/cart'

  constructor(private http: HttpClient) { }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  addItemToCart(item: Cart) {
    this.http.post<Cart>(this.cartUrl, item).subscribe(res => {
      alert("Added to Cart!")
    }, err => {
      alert("Something went wrong")
    })
  }

}
