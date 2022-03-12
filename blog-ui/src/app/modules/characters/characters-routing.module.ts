import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersShowAllComponent } from './characters-show-all/characters-show-all.component';

const routes: Routes = [
  { path: '', component: CharactersShowAllComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CharactersRoutingModule { 
  static components = [ CharactersShowAllComponent ];
}