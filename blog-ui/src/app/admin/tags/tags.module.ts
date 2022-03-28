import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TagsRoutingModule.components
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ]
})
export class TagsModule { }
