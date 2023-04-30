import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl);
  }
}
