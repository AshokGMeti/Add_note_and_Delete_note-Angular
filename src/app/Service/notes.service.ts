import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../Module/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
    private url="http://localhost:3000/notes"
  constructor(private httpClient: HttpClient) { }
  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.url}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(`${this.url}`, note);
  }
  deleteNote(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
 

}
