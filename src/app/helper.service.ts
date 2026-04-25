import { AlertController, ToastController } from '@ionic/angular';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelperService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController // Add Toast Tip
  ) {}

  /**
   * Show page help modal
   * @param page Page identifier (list/add/edit/privacy)
   */
  async showHelp(page: 'list' | 'add' | 'edit' | 'privacy'): Promise<void> {
    const msg = this.getPageHelp(page);
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: msg,
      buttons: ['OK'],
      cssClass: 'help-alert'
    });
    await alert.present();
  }

  /**
   * Show Toast tip
   * @param message Tip text
   * @param color Color (success/error/warning)
   */
  async showToast(message: string, color: 'success' | 'error' | 'warning' = 'success'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  /**
   * Get page help text
   * @param page Page identifier
   * @returns Help text
   */
  private getPageHelp(page: 'list' | 'add' | 'edit' | 'privacy'): string {
    const helpMap: Record<'list' | 'add' | 'edit' | 'privacy', string> = {
      list: 'Inventory List Help:• View all inventory items with details• Use the search bar to find items by name• Click on an item to edit or delete it',
      add: 'Inventory Operation Help:• Fill in all required fields marked with (*)• Popular Item: After selecting YES, you can find the product in the featured product section.• Comment is the only optional field• Click Add Item to save new inventory',
      edit: 'Update or delete existing items. Note: Laptop item cannot be deleted due to system restrictions.',
      privacy: 'This app complies with privacy regulations: all inventory data is encrypted in transit, and only authorized users can access it.'
    };
    return helpMap[page] || 'No help information available for this page.';
  }
}
