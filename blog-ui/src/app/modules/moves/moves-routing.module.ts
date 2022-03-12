import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovesShowAllComponent } from './moves-show-all/moves-show-all.component';

const routes: Routes = [
  { path: '', component: MovesShowAllComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MovesRoutingModule { 
  static components = [ MovesShowAllComponent ];
}