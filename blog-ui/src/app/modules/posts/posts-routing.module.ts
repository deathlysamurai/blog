import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsShowAllComponent } from './posts-show-all/posts-show-all.component';

const routes: Routes = [
  { path: '', component: PostsShowAllComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PostsRoutingModule { 
  static components = [ PostsShowAllComponent ];
}