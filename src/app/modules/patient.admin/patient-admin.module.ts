import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientAdminRoutingModule } from './patient-admin-routing.module';

import {
  PatientListComponent
} from './index';

@NgModule({
  declarations: [
    PatientListComponent
  ],
  imports: [
    CommonModule,
    PatientAdminRoutingModule
  ]
})
export class PatientAdminModule { }
