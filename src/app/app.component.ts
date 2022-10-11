import { Component, OnInit } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { Note } from './Module/note';
import { NotesService } from './Service/notes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  errMessage: string="";
  note: Note = new Note();
  noteList: Note[]=[];
  editTitle="";
  editText="";
 

  constructor(private notesService: NotesService) { }
  ngOnInit():void
  { 
    
    this.notesService.getNotes().subscribe(response => {
      if (response) {
        this.noteList = response;
      } else {
        this.errMessage = 'We are unable to retreive notes list.';
      }
    }, error => {
      this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
    });
   
  }

  /* To add data to note book table */
  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }

    this.notesService.addNote(this.note).subscribe(response => {
      if (response) {
        this.noteList.push(this.note);
        this.note = new Note();
      } else {
        this.errMessage = 'We are unable to add the selected note.';
      }
    }, error => {
      this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
    });
  }

  /* To delete the data from note book table */
  deleteNote()
  {
     this.notesService.deleteNote(this.note.id).subscribe(data=>{
        this.ngOnInit();
     })
  }
  /* before updating data we have get data from server */
 
  /* To update the data into note book table */
 
    
  
}
