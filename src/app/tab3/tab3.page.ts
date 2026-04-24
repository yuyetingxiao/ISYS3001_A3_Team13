import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {
  alertCircle,
  eyeOff,
  informationCircle,
  lockClosed,
  shield
} from 'ionicons/icons';

import { CommonModule } from '@angular/common';
import { HelperService } from '../helper.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class Tab3Page implements OnInit {

  constructor(private helperService: HelperService) {
    // 注册正确图标
    addIcons({
      lockClosed,
      shield,
      eyeOff,
      alertCircle,
      informationCircle
    });
  }

  ngOnInit(): void {}

  showPrivacyTip() {
    this.helperService.showToast('Your data is fully local and private.', 'success');
  }
showPrivacyHelp() {
  this.helperService.showHelp('privacy');
}
}
