import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { UsersShowAllComponent } from './users-show-all/users-show-all.component';

const routes: Routes = [
  { path: 'users-show-all', 
        component: UsersShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
    }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class UsersRoutingModule { 
  static components = [ UsersShowAllComponent ];
}