import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';
import { ViewvendordetailsComponent } from './viewvendordetails/viewvendordetails.component';
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent, canActivate: [AuthGuardService]},
  {path:'viewvendordetails/:id', component:ViewvendordetailsComponent},
  {path:'vendor', component:VendorComponent},
  {path:'vendor/:id', component:VendorComponent, canActivate: [AuthGuardService]},
  {path:'customer', component:CustomerComponent},
  {path:'customer/:id', component:CustomerComponent, canActivate: [AuthGuardService]},
  {path:'viewcart', component: ViewcartComponent},
  {path:'orders',component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
