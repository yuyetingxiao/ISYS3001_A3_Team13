import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonButton, IonTextarea, IonButtons, IonIcon,
  IonList
} from '@ionic/angular/standalone';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { Category, Inventory, StockStatus } from '../app.component';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButton, IonTextarea, IonButtons, IonIcon,
    IonList
  ]
})
export class Tab2Page {
  newItem: Inventory = {
    item_id: 0,
    item_name: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplier_name: '',
    stock_status: StockStatus.InStock,
    featured_item: 0,
    special_note: ''
  };

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private apiService: ApiService,
    private helperService: HelperService
  ) {}

  onSubmit() {
    if (!this.newItem.item_name || !this.newItem.supplier_name || this.newItem.quantity < 0 || this.newItem.price <= 0) {
      this.helperService.showToast('Please fill all required fields correctly', 'warning');
      return;
    }

    this.apiService.addItem(this.newItem).subscribe({
      next: () => {
        this.helperService.showToast('Item added successfully!', 'success');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.helperService.showToast('Add failed: ' + err.message, 'error');
      }
    });
  }

  resetForm() {
    this.newItem = {
      item_id: 0,
      item_name: '',
      category: Category.Electronics,
      quantity: 0,
      price: 0,
      supplier_name: '',
      stock_status: StockStatus.InStock,
      featured_item: 0,
      special_note: ''
    };
  }

  showHelp() {
    this.helperService.showHelp('add');
  }
}