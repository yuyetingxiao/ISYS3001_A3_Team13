import { Component, OnInit } from '@angular/core';
// 只保留HTML里真正用到的组件
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
// 正确官方图名称，修正拼写错误
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
    IonContent
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
}
