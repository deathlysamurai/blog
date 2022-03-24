import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { TagResponse } from '../../models/responses/tagResponse.model';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  private readonly API_ROUTES = {
    addTag: '/tags',
    deleteTag: (tagId: string) => `/tags/${tagId}`,
    getTag: (tagId: string) => `/tags/${tagId}`,
    getTags: '/tags',
    updateTag: (tagId: string) => `/tags/${tagId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginHeaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getCurrentUserToken());
  }

  public addTag(tag: Tag) {
    return this.http.post(this.baseUrl + this.API_ROUTES.addTag, tag, {'headers': this.loginHeaders()});
  }

  // public deleteTag(tag: Tag) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deleteTag(tag.id));
  // }

  // public getTag(tag: Tag) {
  //   return this.http.get(this.baseUrl + this.API_ROUTES.getTag(tag.id));
  // }

  public getTags(): Observable<TagResponse> {
    return this.http.get<TagResponse>(this.baseUrl + this.API_ROUTES.getTags);
  }

  // public updateTag(tag: Tag) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updateTag(tag.id), tag);
  // }
}
