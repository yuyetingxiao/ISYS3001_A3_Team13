import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelperService {
  constructor(private alertCtrl: AlertController) {}

  async showHelp(page: string) {
    const msg = this.getPageHelp(page);
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  private getPageHelp(page: string): string {
    const map: Record<'list' | 'add' | 'edit' | 'privacy', string> = {
      list: 'View all inventory. Search by item name.',
      add: 'Add new item. Featured items are marked 1.',
      edit: 'Update or delete items. Laptop cannot be deleted.',
      privacy: 'View privacy & security requirements for mobile app.'
    };
    // Type secure access
    return map[page as keyof typeof map] || 'No help available';
  }
}
