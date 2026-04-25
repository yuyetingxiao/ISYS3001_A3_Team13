import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

/**
 * Inventory category enumeration
 * Defines all available product categories for inventory items
 */
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

/**
 * Stock status enumeration
 * Represents the inventory availability status of items
 */
export enum StockStatus {
  InStock = 'In Stock',      // Item is available in sufficient quantity
  LowStock = 'Low Stock',    // Item quantity is running low
  OutOfStock = 'Out of Stock'// Item is completely unavailable
}

/**
 * Inventory interface
 * Defines the structure for inventory items in the application
 */
export interface Inventory {
  item_id: number;               // Unique identifier for the inventory item
  item_name: string;             // Name/title of the inventory item
  category: Category;            // Product category (from Category enum)
  quantity: number;              // Current stock quantity
  price: number;                 // Unit price of the item
  supplier_name: string;         // Name of the item supplier
  stock_status: StockStatus;     // Stock availability status (from StockStatus enum)
  featured_item: 0 | 1;          // Flag to mark item as featured (1 = featured, 0 = not featured)
  special_note?: string;         // Optional additional notes about the item (nullable)
}

/**
 * Root application component
 * Serves as the main container for the Ionic application
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet], // Standalone components import
})
export class AppComponent {
  /**
   * Constructor for AppComponent
   * Initializes the root component
   */
  constructor() {}
}