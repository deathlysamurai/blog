import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { PostsCreatePostComponent } from './posts-create-post/posts-create-post.component';

const routes: Routes = [
  { path: 'posts-create-post', 
      component: PostsCreatePostComponent,
      canActivate: [ CanActivateAdminGuard ]  
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class PostsRoutingModule { 
  static components = [ PostsCreatePostComponent ];
}