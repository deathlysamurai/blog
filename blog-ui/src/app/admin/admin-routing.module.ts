import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from '../shared/guards/can-activate-admin.guard';
import { AdminIndexComponent } from './admin-index/admin-index.component';

const routes: Routes = [
    { path: '', 
        component: AdminIndexComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'characters', loadChildren: () => import('./characters/characters.module').then((m) => m.CharactersModule) },
    { path: 'moves', loadChildren: () => import('./moves/moves.module').then((m) => m.MovesModule) },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule) },
    { path: 'tags', loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class AdminRoutingModule { 
  static components = [ AdminIndexComponent ];
}