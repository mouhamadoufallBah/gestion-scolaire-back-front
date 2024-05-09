import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentRoutingModule,
    CoreModule
  ]
})
export class StudentModule { }
