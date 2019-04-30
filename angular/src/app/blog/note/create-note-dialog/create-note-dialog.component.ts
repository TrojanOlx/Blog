import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { NoteDto, NoteServiceService } from '@app/blog/note-service.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.css']
})
export class CreateNoteDialogComponent extends AppComponentBase
  implements OnInit {


    saving = false;
    note :NoteDto=new NoteDto();

  constructor(
    injector:Injector,
    public _noteService :NoteServiceService,
    private _dialogRef: MatDialogRef<CreateNoteDialogComponent>
  ) { 
    super(injector)
  }

  ngOnInit() {
  }

}
