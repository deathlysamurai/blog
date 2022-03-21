import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { GameModule } from '../game/game.module';

@NgModule({
  declarations: [
    HomePageRoutingModule.components
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    GameModule
  ]
})
export class HomePageModule { }
