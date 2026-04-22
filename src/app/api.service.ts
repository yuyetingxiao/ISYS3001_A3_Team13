import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inventory, Category, StockStatus } from './app.component';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private itemsSubject = new BehaviorSubject<Inventory[]>([
    { item_id: 1, item_name: 'Laptop', category: Category.Electronics, stock_status: StockStatus.InStock, quantity: 25, price: 1299.99, supplier_name: 'Tech', featured_item: 1 },
    { item_id: 2, item_name: 'Office Chair', category: Category.Furniture, stock_status: StockStatus.OutOfStock, quantity: 0, price: 199.99, supplier_name: 'Furn', featured_item: 0 },
    { item_id: 3, item_name: 'Wireless Mouse', category: Category.Electronics, stock_status: StockStatus.LowStock, quantity: 3, price: 29.99, supplier_name: 'Tech', featured_item: 1 },
    { item_id: 4, item_name: 'Cotton T-Shirt', category: Category.Clothing, stock_status: StockStatus.InStock, quantity: 50, price: 19.99, supplier_name: 'Apparel', featured_item: 0 }
  ]);

  items$ = this.itemsSubject.asObservable();

  getAllItems(): Observable<Inventory[]> {
    return this.items$;
  }

  addItem(item: Inventory): Observable<Inventory> {
    const items = [...this.itemsSubject.value]; // 深拷贝避免引用问题
    item.item_id = Math.floor(Math.random() * 10000);
    items.push(item);
    this.itemsSubject.next(items);
    return new Observable(observer => {
      observer.next(item);
      observer.complete();
    });
  }

  deleteItem(itemName: string): Observable<void> {
    const items = this.itemsSubject.value.filter(i => i.item_name !== itemName);
    this.itemsSubject.next(items);
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  // 修复：改用item_id作为唯一匹配键（不会随名称修改变化）
  updateItem(itemId: number, updatedItem: Inventory): Observable<Inventory> {
    const items = [...this.itemsSubject.value]; // 深拷贝触发引用变化
    const index = items.findIndex(i => i.item_id === itemId);
    if (index !== -1) {
      items[index] = { ...updatedItem, item_id: itemId }; // 保留原ID，防止ID丢失
      this.itemsSubject.next(items); // 触发订阅刷新
      return new Observable(observer => {
        observer.next(items[index]);
        observer.complete();
      });
    }
    // 未找到项时抛出错误
    return new Observable(observer => {
      observer.error(new Error('Item not found'));
    });
  }
}