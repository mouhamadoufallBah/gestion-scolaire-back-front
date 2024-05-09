import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
