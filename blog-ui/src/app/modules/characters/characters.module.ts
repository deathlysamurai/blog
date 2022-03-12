import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';

@NgModule({
  declarations: [
    CharactersRoutingModule.components
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule
  ]
})
export class CharactersModule { }
