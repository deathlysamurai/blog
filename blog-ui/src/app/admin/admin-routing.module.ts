import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from '../shared/guards/can-activate-admin.guard';
import { UsersShowAllComponent } from './users-show-all/users-show-all.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CharactersShowAllComponent } from './characters-show-all/characters-show-all.component';
import { CharactersCreateCharacterComponent } from './characters-create-character/characters-create-character.component';
import { MovesShowAllComponent } from './moves-show-all/moves-show-all.component';
import { MovesCreateMoveComponent } from './moves-create-move/moves-create-move.component';
import { PostsCreatePostComponent } from './posts-create-post/posts-create-post.component';
import { TagsCreateTagComponent } from './tags-create-tag/tags-create-tag.component';

const routes: Routes = [
    { path: '', 
        component: AdminIndexComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'users-show-all', 
        component: UsersShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'characters-show-all', 
        component: CharactersShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'characters-create-character', 
        component: CharactersCreateCharacterComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'moves-show-all', 
        component: MovesShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'moves-create-move', 
        component: MovesCreateMoveComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'posts-create-post', 
        component: PostsCreatePostComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
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
export class AdminRoutingModule { 
  static components = [ UsersShowAllComponent, 
                        AdminIndexComponent, 
                        CharactersShowAllComponent, 
                        CharactersCreateCharacterComponent,
                        MovesShowAllComponent,
                        MovesCreateMoveComponent,
                        PostsCreatePostComponent,
                        TagsCreateTagComponent ];
}