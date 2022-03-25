import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

@NgModule({
  declarations: [
    GameRoutingModule.components
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  exports: [
    WelcomeScreenComponent
  ]
})
export class GameModule { }
