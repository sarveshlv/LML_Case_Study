import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  role!:string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if(this.role === 'Admin') {
      this.authService.login(this.email, this.password)
      .subscribe(
        users => {
          if (this.authService.isLoggedIn()) {
            // redirect to admin component if login is successful
            this.router.navigate(['/admin']);
          }
        },
        error => {
          throw new Error("Invalid Username or Password");
        }
      );
    } else if(this.role === 'Vendor') {
      this.authService.loginVendor(this.email, this.password)
      .subscribe(
        vendors => {
          if (this.authService.isLoggedIn()) {
            // redirect to admin component if login is successful
            const url = `/vendor/${vendors.id}`
            this.router.navigateByUrl(url);
          }
        },
        error => {
          throw new Error("Invalid Username or Password");
        }
      );
    } else if(this.role === 'Customer') {
      this.authService.loginCustomer(this.email, this.password)
      .subscribe(
        customers => {
          if (this.authService.isLoggedIn()) {
            // redirect to admin component if login is successful
            const url = `/customer/${customers.id}`
            this.router.navigateByUrl(url);
          }
        },
        error => {
          throw new Error("Invalid Username or Password");
        }
      );
    } else {
      throw new Error("Invalid Credentials!")
    }
  }
}
