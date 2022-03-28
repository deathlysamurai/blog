import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovesRoutingModule } from './moves-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MovesRoutingModule.components
  ],
  imports: [
    CommonModule,
    MovesRoutingModule,
    SharedModule
  ]
})
export class MovesModule { }
