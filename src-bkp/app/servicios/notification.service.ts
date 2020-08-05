import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
      color: color
    });
    toast.present();
  }

  async presentLoading(duration, message) {
    const loading = await this.loadingController.create({
      duration: duration,
      message: message
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
