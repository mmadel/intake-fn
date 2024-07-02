import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDigitalIntakeRoutingModule } from './patient-digital-intake-routing.module';
import { CreateDigitalPatientIntakeComponent } from './components/create/create-digital-patient-intake.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SharedModule, SidebarModule, TabsModule, UtilitiesModule, DateRangePickerModule, AlertModule, MultiSelectModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { PatientBasicComponent } from './components/patient.basic/patient-basic.component';


const COREUI_MODULES = [
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  IconModule,
  DateRangePickerModule,
  AlertModule,
  MultiSelectModule
]
@NgModule({
  declarations: [
    CreateDigitalPatientIntakeComponent,
    PatientBasicComponent
  ],
  imports: [
    CommonModule,
    PatientDigitalIntakeRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ...COREUI_MODULES,
  ]
})
export class PatientDigitalIntakeModule { }
