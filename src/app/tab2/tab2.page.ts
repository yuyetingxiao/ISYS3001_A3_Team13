import { Component } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonItem, IonLabel, IonInput, IonSelect,
  IonButton, IonTextarea, IonButtons, IonIcon 
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { Category, Inventory, StockStatus } from '../app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { helpCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonButton,
    IonTextarea,
    IonButtons,
    IonIcon,
    ExploreContainerComponent
  ],
})
export class Tab2Page {
  newItem: Partial<Inventory> = {
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
  ) {
    addIcons({ helpCircle });
  }

  onSubmit(): void {
    if (!this.newItem.item_name || !this.newItem.supplier_name || this.newItem.quantity === undefined || this.newItem.price === undefined) {
      this.helperService.showToast('Please fill in all required fields', 'warning');
      return;
    }

    const item: Inventory = {
      item_id: Math.floor(Math.random() * 1000),
      item_name: this.newItem.item_name!,
      category: this.newItem.category!,
      quantity: this.newItem.quantity!,
      price: this.newItem.price!,
      supplier_name: this.newItem.supplier_name!,
      stock_status: this.newItem.stock_status!,
      featured_item: this.newItem.featured_item as 0 | 1,
      special_note: this.newItem.special_note
    };

    this.apiService.addItem(item).subscribe({
      next: () => {
        this.helperService.showToast('Item added successfully');
        this.resetForm();
      },
      error: (err) => {
        this.helperService.showToast(err.message, 'error');
      }
    });
  }

  resetForm(): void {
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

  showHelp(): void {
    this.helperService.showHelp('add');
  }
}
