import { Category, Inventory, StockStatus } from '../app.component';
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../helper.service';
import { IonBadge } from '@ionic/angular/standalone';

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
    IonText, IonSegment, IonSegmentButton,
    IonInput, IonSelect, IonSelectOption, IonTextarea, IonBadge
  ],
  providers: [HelperService]
})
export class Tab1Page implements OnInit {
  items: Inventory[] = [];
  filteredItems: Inventory[] = [];
  selectedFilter = 'all';
  public readonly StockStatus = StockStatus;
  public readonly Category = Category;
  public readonly Object = Object;
  editingItem: Inventory | null = null;
  showEditForm = false;

  // ====================== 【只加这一行，解决报错】 ======================
  featuredItems: Inventory[] = [];

  constructor(
    private helper: HelperService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.items$.subscribe(items => {
      this.items = items;
      this.filterByStatus();

      // ====================== 【只加这一行，自动刷新】 ======================
      this.featuredItems = items.filter(i => i.featured_item === 1);
    });
  }

  onSearch(e: any) {
    const t = e.target.value?.toLowerCase() || '';
    this.filteredItems = this.items.filter(x =>
      x.item_name.toLowerCase().includes(t)
    );
  }

  filterByStatus() {
  if (this.selectedFilter === 'all') {
    this.filteredItems = [...this.items];
  } else if (this.selectedFilter === 'in-stock') {
    this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.InStock);
  } else if (this.selectedFilter === 'low-stock') {
    this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.LowStock);
  } else if (this.selectedFilter === 'out-of-stock') {
    this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.OutOfStock);
  } 
  // ✅ 新增：处理Featured标签的过滤
  else if (this.selectedFilter === 'featured') {
    this.filteredItems = this.items.filter(i => i.featured_item === 1);
  }
}

  deleteItem(item: Inventory) {
    this.api.deleteItem(item.item_name).subscribe({
      next: () => this.helper.showToast('Deleted', 'success'),
      error: () => this.helper.showToast('Delete failed', 'error')
    });
  }

  startEdit(item: Inventory) {
    this.editingItem = { ...item };
    this.showEditForm = true;
  }

  saveEdit() {
    if (!this.editingItem) return;
    this.api.updateItem(this.editingItem.item_id, this.editingItem).subscribe({
      next: () => {
        this.showEditForm = false;
        this.editingItem = null;
        this.helper.showToast('Updated', 'success');
      },
      error: () => this.helper.showToast('Update failed', 'error')
    });
  }

  cancelEdit() {
    this.showEditForm = false;
    this.editingItem = null;
  }

  getStatusIcon(s: StockStatus) {
    switch(s) {
      case StockStatus.InStock: return 'checkmark-circle';
      case StockStatus.LowStock: return 'alert-circle';
      case StockStatus.OutOfStock: return 'close-circle';
      default: return 'help-circle';
    }
  }

  getStatusColor(s: StockStatus) {
    switch(s) {
      case StockStatus.InStock: return 'success';
      case StockStatus.LowStock: return 'warning';
      case StockStatus.OutOfStock: return 'danger';
      default: return 'medium';
    }
  }

  formatPrice(p: number) {
    return `$${p.toFixed(2)}`;
  }

  showHelp() {
    this.helper.showHelp('list');
  }
}