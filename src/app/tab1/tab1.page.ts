import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonSearchbar,
  IonList, IonItem, IonLabel, IonIcon,
  IonText, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { HelperService } from '../helper.service';
import { Inventory, StockStatus, Category } from '../app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonSearchbar,
    IonList, IonItem, IonLabel, IonIcon,
    IonText, IonSegment, IonSegmentButton
  ],
  providers: [HelperService]
})
export class Tab1Page implements OnInit {
  items: Inventory[] = [];
  filteredItems: Inventory[] = [];
  selectedFilter: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock' = 'all';
  public readonly StockStatus = StockStatus;

  constructor(
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.loadOnlyCustomItems();
  }

  private loadOnlyCustomItems() {
    this.items = [
      { 
        item_id: 1, 
        item_name: 'Laptop', 
        category: Category.Electronics,
        stock_status: StockStatus.InStock, 
        quantity: 25, 
        price: 1299.99,
        supplier_name: 'Tech Supplier', 
        featured_item: 1 
      },
      { 
        item_id: 2, 
        item_name: 'Office Chair', 
        category: Category.Furniture,
        stock_status: StockStatus.OutOfStock, 
        quantity: 0, 
        price: 199.99,
        supplier_name: 'Furniture Co', 
        featured_item: 0 
      },
      { 
        item_id: 3, 
        item_name: 'Wireless Mouse', 
        category: Category.Electronics,
        stock_status: StockStatus.LowStock, 
        quantity: 3, 
        price: 29.99,
        supplier_name: 'Tech Supplier', 
        featured_item: 1 
      },
      { 
        item_id: 4, 
        item_name: 'Cotton T-Shirt', 
        category: Category.Clothing,
        stock_status: StockStatus.InStock, 
        quantity: 50, 
        price: 19.99,
        supplier_name: 'Apparel Inc', 
        featured_item: 0 
      }
    ];
    this.filteredItems = [...this.items];
  }

  showHelp() {
    this.helperService.showHelp('list');
  }

  onSearch(event: any) {
    const term = event.target.value?.toLowerCase() || '';
    this.applyFilters(term, this.selectedFilter);
  }

  filterByStatus() {
    this.applyFilters('', this.selectedFilter);
  }

  private applyFilters(term: string, statusFilter: string) {
    this.filteredItems = this.items.filter(item => {
      const matchesSearch = item.item_name.toLowerCase().includes(term);
      let matchesStatus = true;
      switch (statusFilter) {
        case 'all': matchesStatus = true; break;
        case 'in-stock': matchesStatus = item.stock_status === StockStatus.InStock; break;
        case 'low-stock': matchesStatus = item.stock_status === StockStatus.LowStock; break;
        case 'out-of-stock': matchesStatus = item.stock_status === StockStatus.OutOfStock; break;
      }
      return matchesSearch && matchesStatus;
    });
  }

  getStatusIcon(s: StockStatus) {
    switch (s) {
      case StockStatus.InStock: return 'checkmark-circle';
      case StockStatus.LowStock: return 'alert-circle';
      case StockStatus.OutOfStock: return 'close-circle';
      default: return 'help-circle';
    }
  }

  getStatusColor(s: StockStatus) {
    switch (s) {
      case StockStatus.InStock: return 'success';
      case StockStatus.LowStock: return 'warning';
      case StockStatus.OutOfStock: return 'danger';
      default: return 'medium';
    }
  }

  getStockClass(s: StockStatus) {
    return s.toLowerCase().replace(' ', '-');
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return '$0.00';
    return `$${price.toFixed(2)}`;
  }
}