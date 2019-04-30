import { Component, OnInit, Injector, Optional, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PublicNoteDto, NoteServiceService } from '@app/blog/note-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import marked from 'marked'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent extends AppComponentBase implements OnInit {
  model = 1;
  isFull = false;
  note: PublicNoteDto =new PublicNoteDto();
  preViewContent = '';
  active = false;
  term=new FormControl();
  
  constructor(
    injector: Injector,
    public _noteService: NoteServiceService,
    private _dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Optional()@Inject(MAT_DIALOG_DATA) private input:any
  ) {
    super(injector);
  }

  ngOnInit() :void{
    this._noteService.getNote(this.input.id).subscribe(result=>{
      if (this.input.isPublic){
        this.model=2;
        this.isFull=true;
      }
      this.note=result;
      this.active=true;
      this.term.valueChanges
          .pipe(debounceTime(300),distinctUntilChanged())
          .subscribe(term=>{
            this.preViewContent=marked(this.note.content);
          })
      this.term.valueChanges
          .pipe(debounceTime(1000*30))
          .subscribe(t=>this.updateNote());

    })
  }

  publicNote():void{
    this.note.img="http://oulongxing.com/images/Trojan.png";
    this.note.des='略略略,略略略,略略略;';
    this._noteService.publicNote(this.note).subscribe(m=>{
      abp.notify.success(this.l('Success'));
      this.close(true);
    })
  }




  updateNote(): void {
    this._noteService.update(this.note).subscribe(m=>{
    });
  }

  // 关闭
  close(result :any):void{
    this.updateNote();
    this.active=false;
    this._dialogRef.close(result);
  }

  // 显示模式
  changeModel(m){
    this.model=m;
  }

  /**
   * 是否全屏
   */
  full(){
    this.isFull=!this.isFull;
  }

}
