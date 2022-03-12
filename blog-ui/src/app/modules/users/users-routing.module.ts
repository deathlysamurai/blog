import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersShowAllComponent } from './users-show-all/users-show-all.component';

const routes: Routes = [
  { path: '', component: UsersShowAllComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { 
  static components = [ UsersShowAllComponent ];
}