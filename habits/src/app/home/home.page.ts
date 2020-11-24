import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Subject } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  habits = [];
  habitId;
  showRemoveButton = false;

  counter = 0;

  constructor(public alertController: AlertController) {}

  ionViewDidEnter() {
    this.habits = JSON.parse(localStorage.getItem("habits")) || [];
  }

  pressEvent() {
    this.counter++;
  }

  onRemoveHabit() {
    this.habits.splice(this.habitId, 1);
    localStorage.setItem("habits", JSON.stringify(this.habits));
    this.habitId = null; 
  }

  onEditHabit(id) {
    this.habitId = id;
    this.onAddHabit();
  }

  async onAddHabit() {
    let currentHabit;
    let title;
    if (this.habitId == null) {
      title = "Insert new habit!";
      currentHabit = {
        name: "",
        repeatTimes: "",
        timeframe: "",
      };
    } else {
      title = "Change habit";
      currentHabit = {
        name: this.habits[this.habitId].name,
        repeatTimes: this.habits[this.habitId].repeatTimes,
        timeframe: this.habits[this.habitId].timeframe,
      };
    }
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      inputs: [
        {
          name: "name",
          id: "code1",
          type: "text",
          placeholder: "Name of habit",
          cssClass: "nameInput alertInput",
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
          name: "repeatTimes",
          id: "code2",
          type: "number",
          cssClass: "repeatInput alertInput",
          value: currentHabit.repeatTimes
        },
        {
          name: "timeframe",
          id: "code3",
          type: "number",
          cssClass: "timeframeInput alertInput",
          value: currentHabit.timeframe
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.habitId = null;
          },
        },
        {
          text: "Ok",
          cssClass: "confirm",
          handler: (alertData) => {
            let newHabit = {
              name: alertData.name,
              repeatTimes: alertData.repeatTimes,
              timeframe: alertData.timeframe,
              done: false,
              datesDone: [],
            };
            if (this.habitId == null) {
              this.habits.push(newHabit);
            } else {
              this.habits[this.habitId] = newHabit;
              this.habitId = null;
            }
            localStorage.setItem("habits", JSON.stringify(this.habits)); 
          },
        },
      ],

      
    });

    await alert.present();

    const confirmBtn = document.querySelector('.confirm') as HTMLButtonElement;
   
    if (this.habitId == null) {
      confirmBtn.disabled = true;
      confirmBtn.classList.add("disabled");
    } else {
      confirmBtn.disabled = false;
      confirmBtn.classList.remove("disabled");
    }

    const code$ = new Subject();
    const codeInput = document.getElementsByClassName('alertInput') as HTMLCollectionOf<HTMLInputElement>;
    const alertInputs = Array.from(codeInput);
    alertInputs.forEach(element => {
      element.addEventListener('keyup', () => code$.next(alertInputs));
    });
    code$.asObservable().subscribe((alertInputs: HTMLInputElement[]) => {
      let buttonDisabled = false;
      confirmBtn.classList.remove("disabled");
      alertInputs.forEach(element => {
        if (element.value == "") {
          buttonDisabled = true;
          confirmBtn.classList.add("disabled");
        }
      });
      confirmBtn.disabled = buttonDisabled;
    });

    // const confirmBtn = document.querySelector('.confirm') as HTMLButtonElement;
    // confirmBtn.disabled = true;

    // let codeOneDisabled;
    // let codeTwoDisabled;
    //   let codeThreeDisabled;
    // if (this.habitId == null) {
    //   codeOneDisabled = true;
    //   codeTwoDisabled = true;
    //   codeThreeDisabled = true;
    // } else {
    //   confirmBtn.disabled = false;
    // }

    // const code1$ = new Subject();
    // const codeInput1 = document.getElementById('code1') as HTMLInputElement;
    // codeInput1.addEventListener('keyup', () => code1$.next(codeInput1.value));
    // code1$.asObservable().subscribe(code => {
    //   codeOneDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });

    // const code2$ = new Subject();
    // const codeInput2 = document.getElementById('code2') as HTMLInputElement;
    // codeInput2.addEventListener('keyup', () => code2$.next(codeInput2.value));
    // code2$.asObservable().subscribe(code => {
    //   codeTwoDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });

    // const code3$ = new Subject();
    // const codeInput3 = document.getElementById('code3') as HTMLInputElement;
    // codeInput3.addEventListener('keyup', () => code3$.next(codeInput3.value));
    // code3$.asObservable().subscribe(code => {
    //   codeThreeDisabled = (code == '');
    //   confirmBtn.disabled = (codeOneDisabled || codeTwoDisabled || codeThreeDisabled);
    // });
  
    
  }


}
