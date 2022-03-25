import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  { path: 'game-screen', component: GameScreenComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GameRoutingModule { 
  static components = [ WelcomeScreenComponent, GameScreenComponent ];
}