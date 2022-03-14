import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../models/userResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_ROUTES = {
    registerUser: '/users/register',
    deleteUser: (userId: string) => `/users/${userId}`,
    getUser: (userId: string) => `/users/${userId}`,
    getUsers: '/users',
    updateUser: (userId: string) => `/users/${userId}`,
    loginUser: '/users/login'
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // public registerUser(user: User) {
  //   return this.http.post(this.baseUrl + this.API_ROUTES.registerUser, user);
  // }

  // public deleteUser(user: User) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deleteUser(user.id));
  // }

  // public getUser(user: User) {
  //   return this.http.get(this.baseUrl + this.API_ROUTES.getUser(user.id));
  // }

  public getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl + this.API_ROUTES.getUsers);
  }

  // public updateUser(user: User) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updateUser(user.id), user);
  // }

  // public loginUser(user: User) {
  //   return this.http.post(this.baseUrl + this.API_ROUTES.loginUser, user);
  // }
}
