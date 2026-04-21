import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

<<<<<<< HEAD
//Enumeration Type Optimization
=======
// Enumeration type optimization
>>>>>>> fd1f6b829c3552f14f6d6389269d3340c82e7bc2
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

// Add comments to interfaces and strictly define types
export interface Inventory {
  item_id: number;
  item_name: string;
  category: Category;
  quantity: number;
  price: number; 
  supplier_name: string;
  stock_status: StockStatus;
  featured_item: 0 | 1;
  special_note?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
