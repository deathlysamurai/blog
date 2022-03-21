import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostResponse } from '../../models/responses/postResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_ROUTES = {
    addPost: '/posts',
    deletePost: (postId: string) => `/posts/${postId}`,
    getPost: (postId: string) => `/posts/${postId}`,
    getPosts: '/posts',
    updatePost: (postId: string) => `/posts/${postId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // public addPost(post: Post) {
  //   return this.http.post(this.baseUrl + this.API_ROUTES.addPost, post);
  // }

  // public deletePost(post: Post) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deletePost(post.id));
  // }

  // public getPost(post: Post) {
  //   return this.http.get(this.baseUrl + this.API_ROUTES.getPost(post.id));
  // }

  public getPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.baseUrl + this.API_ROUTES.getPosts);
  }

  // public updatePost(post: Post) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updatePost(post.id), post);
  // }
}
