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
// Import required Ionic icons
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

/**
 * Privacy and Security Component
 * Handles privacy-related UI and user interactions
 */
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

  /**
   * Constructor for Tab3Page
   * @param helperService - Service for shared UI helper functions
   */
  constructor(private helperService: HelperService) {
    // Register Ionic icons for use in template
    addIcons({
      lockClosed,
      shield,
      eyeOff,
      alertCircle,
      informationCircle
    });
  }

  /**
   * OnInit lifecycle hook
   * Executes when component is initialized
   */
  ngOnInit(): void {}

  /**
   * Show privacy information toast
   * Displays a success toast with data privacy message
   */
  showPrivacyTip() {
    this.helperService.showToast('Your data is fully local and private.', 'success');
  }

  /**
   * Show privacy help dialog
   * Triggers helper service to display privacy-related help content
   */
  showPrivacyHelp() {
    this.helperService.showHelp('privacy');
  }
}