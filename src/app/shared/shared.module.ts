import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeTitlePipe } from '../shared/employeeTitle.pipe';

@NgModule({
  declarations: [
    EmployeeTitlePipe
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeTitlePipe
  ]
})
export class SharedModule { }
