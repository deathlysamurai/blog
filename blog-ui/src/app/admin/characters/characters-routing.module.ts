import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { CharactersCreateCharacterComponent } from './characters-create-character/characters-create-character.component';
import { CharactersShowAllComponent } from './characters-show-all/characters-show-all.component';

const routes: Routes = [
  { path: 'characters-show-all', 
        component: CharactersShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
    { path: 'characters-create-character', 
        component: CharactersCreateCharacterComponent,
        canActivate: [ CanActivateAdminGuard ]  
    },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class CharactersRoutingModule { 
  static components = [ CharactersShowAllComponent, CharactersCreateCharacterComponent ];
}