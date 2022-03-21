import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from '../shared/guards/can-activate-admin.guard';
import { UsersShowAllComponent } from './users-show-all/users-show-all.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CharactersShowAllComponent } from './characters-show-all/characters-show-all.component';
import { CharactersCreateCharacterComponent } from './characters-create-character/characters-create-character.component';

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
    }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class AdminRoutingModule { 
  static components = [ UsersShowAllComponent, AdminIndexComponent, CharactersShowAllComponent, CharactersCreateCharacterComponent ];
}