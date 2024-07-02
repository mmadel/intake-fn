import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDigitalIntakeRoutingModule } from './patient-digital-intake-routing.module';
import { CreateDigitalPatientIntakeComponent } from './components/create/create-digital-patient-intake.component';


@NgModule({
  declarations: [
    
  
    CreateDigitalPatientIntakeComponent
  ],
  imports: [
    CommonModule,
    PatientDigitalIntakeRoutingModule
  ]
})
export class PatientDigitalIntakeModule { }
