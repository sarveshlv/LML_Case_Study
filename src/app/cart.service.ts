import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart.model';
import { Orders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:3000/cart';
  private orderUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addItemToCart(item: Cart) {
    this.http.post<Cart>(this.baseUrl, item).subscribe(res => {
      alert("Added to Cart!")
    }, err => {
      alert("Something went wrong")
    })
  }

  clearCartEntries(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/1`);
  }

  addOrderEntries(entries: any): Observable<any> {
    return this.http.post<any>(this.orderUrl, entries);
  }
}
