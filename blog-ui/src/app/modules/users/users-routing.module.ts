import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { UsersLoginComponent } from './users-login/users-login.component';
import { UsersUserPageComponent } from './users-user-page/users-user-page.component';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';

const routes: Routes = [
  { path: 'register', component: UsersRegisterComponent },
  { path: 'login', component: UsersLoginComponent },
  { path: 'user-page', 
    component: UsersUserPageComponent,
    canActivate: [ CanActivateGuard ]  
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard ]
})
export class UsersRoutingModule { 
  static components = [ UsersRegisterComponent, UsersLoginComponent, UsersUserPageComponent ];
}