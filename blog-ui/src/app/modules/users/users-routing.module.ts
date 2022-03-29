import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { UsersLoginComponent } from './users-login/users-login.component';
import { UsersUserPageComponent } from './users-user-page/users-user-page.component';
import { CanActivateGuard } from 'src/app/shared/guards/can-activate.guard';
import { AccountComponent } from './users-user-page/account/account.component';
import { PasswordComponent } from './users-user-page/password/password.component';

const routes: Routes = [
  { path: 'register', component: UsersRegisterComponent },
  { path: 'login', component: UsersLoginComponent },
  { path: 'user-page', 
    component: UsersUserPageComponent,
    canActivate: [ CanActivateGuard ],
    // children: [
    //   {
    //     path: '',
    //     component: AccountComponent,
    //     outlet: 'user-page'
    //   },
    //   {
    //     path: 'password',
    //     component: PasswordComponent,
    //     outlet: 'user-page'
    //   }
    // ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard ]
})
export class UsersRoutingModule { 
  static components = [ UsersRegisterComponent, 
                        UsersLoginComponent, 
                        UsersUserPageComponent,
                        AccountComponent,
                        PasswordComponent ];
}