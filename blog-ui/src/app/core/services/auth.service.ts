import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../data/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl!: string;
  private isLoggedIn = new Subject<boolean>();
  private isAdmin = new Subject<boolean>();

  constructor() { }

  getCurrentUser(): User {
    return <User>JSON.parse(localStorage.getItem('currentUser')!);
  }

  getCurrentUserToken(): string {
    return JSON.parse(localStorage.getItem('currentUserToken')!);
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem('admin')!);
  }

  login(token: string, currentUser: User, admin: boolean) {
    localStorage.setItem('currentUserToken', JSON.stringify(token));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('admin', JSON.stringify(admin));
    this.isLoggedIn.next(true);
    if(admin) {
      this.isAdmin.next(true);
    }
  }

  logout() {
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('admin');
    this.isLoggedIn.next(false);
    if(this.isAdmin) {
      this.isAdmin.next(false);
    }
  }

  loginChanged(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  adminChanged(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }
}
