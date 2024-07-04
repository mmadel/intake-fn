import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDigitalIntakeRoutingModule } from './patient-digital-intake-routing.module';
import { CreateDigitalPatientIntakeComponent } from './components/create/create-digital-patient-intake.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SharedModule, SidebarModule, TabsModule, UtilitiesModule, DateRangePickerModule, AlertModule, MultiSelectModule, DatePickerModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { PatientBasicComponent } from './components/patient.basic/patient-basic.component';
import { PatientCommonModule } from '../common';
import { PatientAddressComponent } from './components/patient.address/patient-address.component';
import { PatientMedicalComponent } from './components/patient.medical/patient-medical.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


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
  MultiSelectModule,
  DatePickerModule
]
@NgModule({
  declarations: [
    CreateDigitalPatientIntakeComponent,
    PatientBasicComponent,
    PatientAddressComponent,
    PatientMedicalComponent
  ],
  imports: [
    CommonModule,
    PatientDigitalIntakeRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    PatientCommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ...COREUI_MODULES,
    AutocompleteLibModule,
  ]
})
export class PatientDigitalIntakeModule { }
