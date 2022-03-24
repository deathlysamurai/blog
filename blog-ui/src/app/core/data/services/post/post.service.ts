import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostResponse } from '../../models/responses/postResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Post } from '../../models/post.model';

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

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginHeaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getCurrentUserToken());
  }

  public addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('imagePath', post.imagePath!);
    postData.append('tags', post.tags! ? post.tags.toString() : "");

    return this.http.post(this.baseUrl + this.API_ROUTES.addPost, postData, {'headers': this.loginHeaders()});
  }

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
