import { Injectable, Inject, Optional, inject } from '@angular/core';
import { ApiServiceBaseService } from '@shared/service-base/api-service-base';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';




// api地址
const NoteApiUrls = {
  Create: '/api/services/app/NoteAppServer/Create',
  PublicNote: '/api/services/app/NoteAppServer/PublicNote',
  Update: '/api/services/app/NoteAppServer/Update',
  GetAll: '/api/services/app/NoteAppServer/GetAll',
  GetNote: '/api/services/app/NoteAppServer/GetNote',
  Delete: '/api/services/app/NoteAppServer/Delete'
};


@Injectable()
export class NoteServiceService extends ApiServiceBaseService {
  private baseUrl: string;
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(http);
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  create(input: CreateNoteDto): Observable<NoteDto> {
    let url_ = this.baseUrl + NoteApiUrls.Create;
    return this.post<NoteDto, CreateNoteDto>(url_, input);
  }

  update(input: UpdateNoteDto): Observable<NoteDto> {
    let url_ = this.baseUrl + NoteApiUrls.Update;
    return this.put<NoteDto, UpdateNoteDto>(url_, input);
  }

  remove(id: number): Observable<void> {
    let url_ = this.baseUrl + NoteApiUrls.Delete+"?";
    url_+='Id='+encodeURIComponent(''+id);
    return this.delete(url_);
  }

  getAll(MaxResultCount = 20, SkipCount = 0, key = ''): Observable<PagedResultDtoOfNoteDto> {
    let url_ = this.baseUrl+ NoteApiUrls.GetAll + '?';
    url_ += 'SkipCount=' + encodeURIComponent('' + SkipCount) + '&';
    url_ += 'MaxResultCount=' + encodeURIComponent('' + MaxResultCount) + '&';
    url_ += 'key=' + encodeURIComponent('' + key);
    url_ = url_.replace(/[?&]$/, '');
    return this.get<PagedResultDtoOfNoteDto>(url_);
  }

  getNote(id: number): Observable<PublicNoteDto> {
    let url_ = this.baseUrl+ NoteApiUrls.GetNote + '?';
    url_ += 'Id=' + encodeURIComponent('' + id);
    return this.get<PublicNoteDto>(url_);
  }


  publicNote(input: PublicNoteDto): Observable<void> {
    const url_ = this.baseUrl+ NoteApiUrls.PublicNote;
    return this.post<void, PublicNoteDto>(url_, input);
  }

}



export interface INoteDto {
  title: string;
  creationTime: string;
  id: number;
  like: number;
  collect: number;
  scan: number;
  isPublic: boolean;
}

export class NoteDto implements INoteDto {
  title: string;
  creationTime: string;
  id: number;
  like: number;
  collect: number;
  scan: number;
  isPublic: boolean;
  constructor(data?: INoteDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.title = data["title"];
      this.creationTime = data["creationTime"];
      this.id = data["id"];
      this.like = data["like"];
      this.collect = data["collect"];
      this.scan = data["scan"];
      this.isPublic = data["isPublic"];
    }
  }

  static fromJS(data: any): NoteDto {
    data = typeof data === 'object' ? data : {};
    let result = new NoteDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["title"] = this.title;
    data["creationTime"] = this.creationTime;
    data["id"] = this.id;
    data["like"] = this.like;
    data["collect"] = this.collect;
    data["scan"] = this.scan;
    data["isPublic"] = this.isPublic;
    return data;
  }

  clone(): NoteDto {
    const json = this.toJSON();
    let result = new NoteDto();
    result.init(json);
    return result;
  }




}

export class UpdateNoteDto {
  id: number;
  title: string;
  content: string;
}

export class CreateNoteDto {
  textType: number;
  title: string;
  content: string;
}

export class PublicNoteDto {
  id: number;
  title: string;
  content: string;
  des: string;
  img: string;
  tags: string;
}

export class PagedResultDtoOfNoteDto {
  totalCount: number | undefined;
  items: NoteDto[] | undefined;
}