import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutesRoutingModule } from './admin-routes-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutesRoutingModule,
    SharedModule
  ]
})
export class AdminRoutesModule { }
