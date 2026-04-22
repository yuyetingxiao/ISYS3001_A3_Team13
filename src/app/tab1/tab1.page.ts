import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonSearchbar,
  IonList, IonItem, IonLabel, IonIcon,
  IonText, IonSegment, IonSegmentButton,
  IonInput, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/angular/standalone';
import { HelperService } from '../helper.service';
import { ApiService } from '../api.service';
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
    IonText, IonSegment, IonSegmentButton,
    IonInput, IonSelect, IonSelectOption, IonTextarea
  ],
  providers: [HelperService]
})
export class Tab1Page implements OnInit {
  items: Inventory[] = [];
  filteredItems: Inventory[] = [];
  selectedFilter = 'all';
  public readonly StockStatus = StockStatus;
  public readonly Category = Category;
  // 关键：让模板可以访问 Object
  public readonly Object = Object;

  editingItem: Inventory | null = null;
  showEditForm = false;

  constructor(
    private helper: HelperService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.items$.subscribe(items => {
      this.items = items;
      this.filterByStatus();
    });
  }

  onSearch(e: any) {
    const t = e.target.value?.toLowerCase() || '';
    this.filteredItems = this.items.filter(x =>
      x.item_name.toLowerCase().includes(t)
    );
  }

  filterByStatus() {
    this.filteredItems = this.items.filter(x => {
      if (this.selectedFilter === 'all') return true;
      if (this.selectedFilter === 'in-stock') return x.stock_status === StockStatus.InStock;
      if (this.selectedFilter === 'low-stock') return x.stock_status === StockStatus.LowStock;
      if (this.selectedFilter === 'out-of-stock') return x.stock_status === StockStatus.OutOfStock;
      return true;
    });
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