import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  isSaved = true;
  newNote: {header: string, text: string};
  isNew = true;

  constructor() { }

  ngOnInit() {
  }

  onChangeInput() {
    setTimeout(() => {this.isSaved = false}, 500);
  }

  onSave(form: NgForm) {
    this.newNote = form.value;
    this.isSaved = true;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (this.isNew) {
      notes.push(this.newNote);
      this.isNew = false;
    } else {
      notes[notes.length-1] = this.newNote;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

}

