import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameScreenComponent } from './game-screen/game-screen.component';

@NgModule({
  declarations: [
    GameRoutingModule.components
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  exports: [
    GameScreenComponent
  ]
})
export class GameModule { }
