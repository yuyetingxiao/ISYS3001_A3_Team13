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
  IonToolbar,
  IonBadge
} from '@ionic/angular/standalone';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../helper.service';

/**
 * Tab1 Page Component :Inventory List Tab
 * Manages inventory item display, filtering, search, editing and deletion
 */
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
  providers: [HelperService] // Provide helper service at component level
})
export class Tab1Page implements OnInit {
  // Full list of inventory items
  items: Inventory[] = [];
  // Filtered list of items (based on search/segment filter)
  filteredItems: Inventory[] = [];
  // Selected segment filter (default: 'all')
  selectedFilter = 'all';
  // Expose enums to template for direct access
  public readonly StockStatus = StockStatus;
  public readonly Category = Category;
  public readonly Object = Object;
  // Current item being edited (null = no edit in progress)
  editingItem: Inventory | null = null;
  // Flag to show/hide edit form
  showEditForm = false;
  // List of featured items (featured_item = 1)
  featuredItems: Inventory[] = [];

  /**
   * Constructor for Tab1Page
   * @param helper - UI helper service (toast, help dialogs)
   * @param api - Inventory data service (CRUD operations)
   */
  constructor(
    private helper: HelperService,
    private api: ApiService
  ) {}

  /**
   * OnInit lifecycle hook
   * Subscribes to inventory data and initializes filters/featured items
   */
  ngOnInit() {
    this.api.items$.subscribe(items => {
      this.items = items;
      this.filterByStatus(); // Apply initial filter
      this.featuredItems = items.filter(i => i.featured_item === 1); // Extract featured items
    });
  }

  /**
   * Handle search bar input
   * Filters items by name (case-insensitive)
   * @param e - Search bar event containing input value
   */
  onSearch(e: any) {
    const t = e.target.value?.toLowerCase() || '';
    this.filteredItems = this.items.filter(x =>
      x.item_name.toLowerCase().includes(t)
    );
  }

  /**
   * Filter items by stock status/featured flag
   * Updates filteredItems based on selectedFilter value
   */
  filterByStatus() {
    if (this.selectedFilter === 'all') {
      this.filteredItems = [...this.items]; // Show all items
    } else if (this.selectedFilter === 'in-stock') {
      this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.InStock);
    } else if (this.selectedFilter === 'low-stock') {
      this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.LowStock);
    } else if (this.selectedFilter === 'out-of-stock') {
      this.filteredItems = this.items.filter(i => i.stock_status === StockStatus.OutOfStock);
    } else if (this.selectedFilter === 'featured') {
      this.filteredItems = this.items.filter(i => i.featured_item === 1);
    }
  }

  /**
   * Delete inventory item
   * Calls API service to delete item and shows toast feedback
   * @param item - Inventory item to delete
   */
  deleteItem(item: Inventory) {
    this.api.deleteItem(item.item_name).subscribe({
      next: () => this.helper.showToast('Deleted', 'success'), // Success feedback
      error: () => this.helper.showToast('Delete failed', 'error') // Error feedback
    });
  }

  /**
   * Start editing an inventory item
   * Creates copy of item (prevents direct state modification) and shows edit form
   * @param item - Inventory item to edit
   */
  startEdit(item: Inventory) {
    this.editingItem = { ...item }; // Create deep copy
    this.showEditForm = true; // Show edit form UI
  }

  /**
   * Save edited inventory item
   * Calls API service to update item and handles success/error states
   */
  saveEdit() {
    if (!this.editingItem) return; // Exit if no item is being edited

    this.api.updateItem(this.editingItem.item_id, this.editingItem).subscribe({
      next: () => {
        this.showEditForm = false; // Hide edit form
        this.editingItem = null; // Clear editing item
        this.helper.showToast('Updated', 'success'); // Success feedback
      },
      error: () => this.helper.showToast('Update failed', 'error') // Error feedback
    });
  }

  /**
   * Cancel item edit
   * Hides edit form and clears editing item (discards changes)
   */
  cancelEdit() {
    this.showEditForm = false;
    this.editingItem = null;
  }

  /**
   * Get icon name based on stock status
   * Maps StockStatus enum values to Ionic icon names
   * @param s - StockStatus value
   * @returns Corresponding icon name string
   */
  getStatusIcon(s: StockStatus) {
    switch(s) {
      case StockStatus.InStock: return 'checkmark-circle';
      case StockStatus.LowStock: return 'alert-circle';
      case StockStatus.OutOfStock: return 'close-circle';
      default: return 'help-circle'; // Fallback icon
    }
  }

  /**
   * Get color class based on stock status
   * Maps StockStatus enum values to Ionic color classes
   * @param s - StockStatus value
   * @returns Corresponding color class string
   */
  getStatusColor(s: StockStatus) {
    switch(s) {
      case StockStatus.InStock: return 'success';
      case StockStatus.LowStock: return 'warning';
      case StockStatus.OutOfStock: return 'danger';
      default: return 'medium'; // Fallback color
    }
  }

  /**
   * Format price as currency string
   * Converts number to USD formatted string (e.g., 19.99 → "$19.99")
   * @param p - Price number to format
   * @returns Formatted currency string
   */
  formatPrice(p: number) {
    return `$${p.toFixed(2)}`;
  }

  /**
   * Show list help dialog
   * Triggers helper service to display list-related help content
   */
  showHelp() {
    this.helper.showHelp('list');
  }
}