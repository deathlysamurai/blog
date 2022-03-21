import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { UsersResponse } from '../../models/responses/user/usersResponse.model';
import { UserResponse } from '../../models/responses/user/userResponse.model';
import { LoginResponse } from '../../models/responses/loginResponse.model';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
    loginUser: '/users/login',
    verifyUniqueUser: (param: string) => `/users/unique/${param}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginHeaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getCurrentUserToken());
  }

  public registerUser(user: User) {
    return this.http.post(this.baseUrl + this.API_ROUTES.registerUser, user);
  }

  // public deleteUser(user: User) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deleteUser(user.id));
  // }

  public getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl + this.API_ROUTES.getUser(userId), {'headers': this.loginHeaders()});
  }

  public getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.baseUrl + this.API_ROUTES.getUsers, {'headers': this.loginHeaders()});
  }

  // public updateUser(user: User) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updateUser(user.id), user);
  // }

  public loginUser(user: User) {
    return this.http.post<LoginResponse>(this.baseUrl + this.API_ROUTES.loginUser, user, { observe: 'response' });
  }

  public verifyUniqueUser(param: string) {
    return this.http.get(this.baseUrl + this.API_ROUTES.verifyUniqueUser(param), { observe: 'response' });
  }
}
