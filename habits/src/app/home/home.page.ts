import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  habits = [];
  habitId;

  constructor(public alertController: AlertController) {}

  ionViewDidEnter() {
    this.habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  onEditHabit(id) {
    this.habitId = id;
    this.onAddHabit();
    this.habitId = null;
  }

  async onAddHabit() {
    let currentHabit;
    if (this.habitId == null) {
      currentHabit = {
        name: "",
        repeatTimes: "",
        timeframe: "",
      };
    } else {
      currentHabit = {
        name: this.habits[this.habitId].name,
        repeatTimes: this.habits[this.habitId].repeatTimes,
        timeframe: this.habits[this.habitId].timeframe,
      };
    }
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Insert new habit!",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Name of habit",
          cssClass: "nameInput",
          value: currentHabit.name
        },
        {
          name: "repeatText",
          type: "textarea",
          value: "Repeat ___ times per ___ days",
          cssClass: "repeatText",
          attributes: {
            readOnly: true,
          },
        },
        {
          name: "repeat",
          type: "number",
          cssClass: "repeatInput",
        },
        {
          name: "timeframe",
          type: "number",
          cssClass: "timeframeInput",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: (alertData) => {
            let newHabit = {
              name: alertData.name,
              repeatTimes: alertData.repeat,
              timeframe: alertData.timeframe,
              done: false,
              datesDone: [],
            };
            this.habits = JSON.parse(localStorage.getItem("habits")) || [];
            this.habits.push(newHabit);
            localStorage.setItem("habits", JSON.stringify(this.habits)); 
          },
        },
      ],
    });

    await alert.present();
  }
}
