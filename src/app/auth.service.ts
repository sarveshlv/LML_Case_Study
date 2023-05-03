import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<any>('http://localhost:3000/users?email=' + email + '&password=' + password)
      .pipe(
        map(users => {
          if (users.length) {
            // login successful if there's a user with the given username and password
            this.loggedIn = true;
          } else {
            throw new Error("Invalid Username or Password!");
          }
          return users;
        })
      );
  }

  loginVendor(email: string, password: string) {
    return this.http.get<any>('http://localhost:3000/vendors?email=' + email + '&password=' + password)
      .pipe(
        map(vendors => {
          if (vendors.length) {
            // login successful if there's a user with the given username and password
            this.loggedIn = true;
          } else {
            throw new Error("Invalid Username or Password!");
          }
          return vendors[0];
        })
      );
  }

  loginCustomer(email: string, password: string) {
    return this.http.get<any>('http://localhost:3000/customers?customeremail=' + email + '&password=' + password)
      .pipe(
        map(customers => {
          if (customers.length) {
            // login successful if there's a user with the given username and password
            this.loggedIn = true;
          } else {
            throw new Error("Invalid Username or Password!");
          }
          return customers[0];
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
