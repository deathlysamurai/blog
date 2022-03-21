import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanActivateAdminGuard } from './guards/can-activate-admin.guard';
import { ValidationService } from './validation/validation.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    CanActivateGuard,
    CanActivateAdminGuard,
    ValidationService
  ]
})
export class SharedModule { }
