import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CharactersCreateCharacterComponent } from './characters-create-character/characters-create-character.component';

@NgModule({
  declarations: [ AdminRoutingModule.components, AdminIndexComponent, CharactersCreateCharacterComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
