import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  isSaved = true;
  newNote: {header: string, text: string, date: Date};
  isNew = true;
  id: number;
  editNote: {header: string, text: string, date: Date};
  editNoteForm: FormGroup;

  constructor(private route: ActivatedRoute, private dbService: DatabaseService) { }

  ngOnInit() {
    this.getParams();
    this.initForm();
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      this.editNote = notes[this.id];
    });
  }

  initForm() {
    if (this.id != null) {
      this.editNoteForm = new FormGroup({
        header: new FormControl(this.editNote.header),
        text: new FormControl(this.editNote.text),
        date: new FormControl(this.editNote.date)
      })
    } else {
      this.editNoteForm = new FormGroup({
        header: new FormControl(),
        text: new FormControl(),
        date: new FormControl()
      })
    }
  }

  onChangeInput() {
    setTimeout(() => {this.isSaved = false}, 500);
  }

  onSave() {
    this.isSaved = true;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (this.id == null) {
      this.newNote = this.editNoteForm.value;
      this.newNote.date = new Date();
      if (this.isNew) {
        notes.push(this.newNote);
        this.isNew = false;
      } else {
        notes[notes.length-1] = this.newNote;
      }
    } else {
      this.editNoteForm.value.date = new Date();
      notes[this.id] = this.editNoteForm.value;
    }
    

    localStorage.setItem("notes", JSON.stringify(notes));
    this.dbService.synchronizeNotes(notes);
  }

}

