import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { TagsCreateTagComponent } from './tags-create-tag/tags-create-tag.component';

const routes: Routes = [
  { path: 'tags-create-tag', 
      component: TagsCreateTagComponent,
      canActivate: [ CanActivateAdminGuard ]  
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class TagsRoutingModule { 
  static components = [ TagsCreateTagComponent ];
}