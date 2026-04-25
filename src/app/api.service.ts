import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inventory, Category, StockStatus } from './app.component';

/**
 * API Service
 * Provides core CRUD operations for inventory data management
 * Uses BehaviorSubject to maintain reactive state of inventory items
 */
@Injectable({ providedIn: 'root' }) // Provide service at root level
export class ApiService {
  // BehaviorSubject to hold and emit inventory items
  private itemsSubject = new BehaviorSubject<Inventory[]>([
    { item_id: 1, item_name: 'Laptop', category: Category.Electronics, stock_status: StockStatus.InStock, quantity: 25, price: 1299.99, supplier_name: 'Tech', featured_item: 1 },
    { item_id: 2, item_name: 'Office Chair', category: Category.Furniture, stock_status: StockStatus.OutOfStock, quantity: 0, price: 199.99, supplier_name: 'Furn', featured_item: 0 },
    { item_id: 3, item_name: 'Wireless Mouse', category: Category.Electronics, stock_status: StockStatus.LowStock, quantity: 3, price: 29.99, supplier_name: 'Tech', featured_item: 1 },
    { item_id: 4, item_name: 'Cotton T-Shirt', category: Category.Clothing, stock_status: StockStatus.InStock, quantity: 50, price: 19.99, supplier_name: 'Apparel', featured_item: 0 }
  ]);

  // Public observable for inventory items, prevents direct modification of subject
  items$ = this.itemsSubject.asObservable();

  /**
   * Get all inventory items
   * @returns Observable of Inventory array
   */
  getAllItems(): Observable<Inventory[]> {
    return this.items$;
  }

  /**
   * Add new inventory item
   * Generates random unique ID and updates the items state
   * @param item - New inventory item to add
   * @returns Observable of the added Inventory item
   */
  addItem(item: Inventory): Observable<Inventory> {
    const items = [...this.itemsSubject.value]; // Create copy to avoid reference issues
    item.item_id = Math.floor(Math.random() * 10000); // Generate random unique ID
    items.push(item);
    this.itemsSubject.next(items); // Emit updated items array

    // Return observable with the added item
    return new Observable(observer => {
      observer.next(item);
      observer.complete();
    });
  }

  /**
   * Delete inventory item by name
   * Filters out the item with matching name and updates state
   * @param itemName - Name of the item to delete
   * @returns Observable of void (completes on success)
   */
  deleteItem(itemName: string): Observable<void> {
    const items = this.itemsSubject.value.filter(i => i.item_name !== itemName);
    this.itemsSubject.next(items); // Emit filtered items array

    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  /**
   * Update existing inventory item 
   * Finds item by ID, updates it, and emits the new state
   * @param itemId - Unique ID of the item to update
   * @param updatedItem - Updated inventory item data
   * @returns Observable of the updated Inventory item 
   */
  updateItem(itemId: number, updatedItem: Inventory): Observable<Inventory> {
    const items = [...this.itemsSubject.value]; // Create copy to trigger reference change
    const index = items.findIndex(i => i.item_id === itemId); // Find item by unique ID

    if (index !== -1) {
      // Preserve original ID (prevent ID loss during update)
      items[index] = { ...updatedItem, item_id: itemId };
      this.itemsSubject.next(items); // Emit updated items array

      // Return observable with updated item
      return new Observable(observer => {
        observer.next(items[index]);
        observer.complete();
      });
    }

    // Return error observable if item not found
    return new Observable(observer => {
      observer.error(new Error('Item not found'));
    });
  }
}