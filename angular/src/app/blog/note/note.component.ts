import { Component, OnInit, Injector } from '@angular/core';
import { NoteDto, NoteServiceService, PagedResultDtoOfNoteDto, CreateNoteDto } from '../note-service.service';
import { MatDialog } from '@angular/material';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { EditNoteDialogComponent } from './edit-note-dialog/edit-note-dialog.component';



class PagedNoteRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [appModuleAnimation()]
})
export class NoteComponent extends PagedListingComponentBase<NoteDto>{

  notes: NoteDto[] = [];
  keyword = '';
  isActive: boolean | null;
  constructor(
    injector: Injector,
    private _noteService: NoteServiceService,
    private _dialog: MatDialog
  ) {
    super(injector);
  }



  createNote(): void {
    // this.showCreateOrEditNoteDialog();
    const input = new CreateNoteDto();
    input.textType = 0;
    input.title = "请输入标题";
    input.content = "请输入内容";
    this._noteService.create(input).subscribe(m => {
      this.refresh();
      this.editNote(m);
    })
  }

  editNote(note: NoteDto): void {
    this.showCreateOrEditNoteDialog(note.id);
  }

  publicNote(note: NoteDto): void {
    this.showCreateOrEditNoteDialog(note.id,true);
  }

  showCreateOrEditNoteDialog(id?: number, isPublic = false) {
    let createOrEditNoteDialog;
    if (isPublic) {
      createOrEditNoteDialog = this._dialog.open(EditNoteDialogComponent,{
        data:{id,isPublic}
      });
    } else {
      createOrEditNoteDialog = this._dialog.open(EditNoteDialogComponent, {
        data: {id,isPublic}
      });
    }
    createOrEditNoteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    })
  }




  protected list(request: PagedNoteRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._noteService.getAll(request.maxResultCount, request.skipCount, request.keyword)
      .pipe(finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: PagedResultDtoOfNoteDto) => {
        this.notes = result.items;
        this.showPaging(result, pageNumber);
      })

  }
  protected delete(note: NoteDto): void {
    abp.message.confirm(
      this.l('NoteDeleteWarningMessage', note.title),
      (result: boolean) => {
        if (result) {
          this._noteService.remove(note.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
