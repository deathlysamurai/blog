import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';

const routes: Routes = [
    { path: '', 
        redirectTo: 'characters',
        canActivate: [ CanActivateAdminGuard ],
    },
    { 
      path: 'characters',
      canActivate: [ CanActivateAdminGuard ],
      loadChildren: () => import('./characters/characters.module').then((m) => m.CharactersModule) 
    },
    { 
      path: 'moves', 
      canActivate: [ CanActivateAdminGuard ],
      loadChildren: () => import('./moves/moves.module').then((m) => m.MovesModule) 
    },
    { 
      path: 'posts', 
      canActivate: [ CanActivateAdminGuard ],
      loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule) 
    },
    { 
      path: 'tags', 
      canActivate: [ CanActivateAdminGuard ],
      loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule) 
    },
    { 
      path: 'users', 
      canActivate: [ CanActivateAdminGuard ],
      loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) 
    }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutesRoutingModule { }