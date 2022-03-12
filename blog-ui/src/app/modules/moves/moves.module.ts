import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovesRoutingModule } from './moves-routing.module';

@NgModule({
  declarations: [
    MovesRoutingModule.components
  ],
  imports: [
    CommonModule,
    MovesRoutingModule
  ]
})
export class MovesModule { }
