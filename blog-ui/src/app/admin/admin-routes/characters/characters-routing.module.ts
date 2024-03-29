import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { CharactersCharacterPageComponent } from './characters-character-page/characters-character-page.component';
import { CharactersCreateCharacterComponent } from './characters-create-character/characters-create-character.component';
import { CharactersShowAllComponent } from './characters-show-all/characters-show-all.component';
import { CharacterComponent } from './characters-character-page/character/character.component';
import { CharactersIndexComponent } from './characters-index/characters-index.component';

const routes: Routes = [
  { path: '', 
    component: CharactersIndexComponent,
    canActivate: [ CanActivateAdminGuard ],
    children: [
      { path: '', 
        component: CharactersShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]  
      },
      { path: 'characters-create-character', 
        component: CharactersCreateCharacterComponent,
        canActivate: [ CanActivateAdminGuard ]  
      },
      { path: 'characters-character-page/:id', 
        component: CharactersCharacterPageComponent,
        canActivate: [ CanActivateAdminGuard ]  
      },
    ]
  },
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class CharactersRoutingModule { 
  static components = [ CharactersIndexComponent,
                        CharactersShowAllComponent, 
                        CharactersCreateCharacterComponent, 
                        CharactersCharacterPageComponent,
                        CharacterComponent ];
}