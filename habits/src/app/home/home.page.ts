import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {}

  async onAddHabit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Insert new habit!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of habit'
        },
        {
          name: 'repeat',
          type: "number",
          placeholder: 'How many times per week',
          attributes: { 
            pattern: "\d*",
            maxlength: "4",
    }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }



}




