import { FoodItem } from "./fooditem.model";

export interface Vendor {
    id: number;
    email: string;
    vendorname: string;
    businessname: string;
    password: string;
    status: 'active' | 'blocked';
    fooditems: FoodItem[];
  }
  