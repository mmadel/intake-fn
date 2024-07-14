import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDigitalIntakeRoutingModule } from './patient-digital-intake-routing.module';
import { CreateDigitalPatientIntakeComponent } from './components/create/create-digital-patient-intake.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SharedModule, SidebarModule, TabsModule, UtilitiesModule, DateRangePickerModule, AlertModule, MultiSelectModule, DatePickerModule, AccordionModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { PatientBasicComponent } from './components/patient.basic/patient-basic.component';
import { PatientCommonModule } from '../common';
import { PatientAddressComponent } from './components/patient.address/patient-address.component';
import { PatientMedicalComponent } from './components/patient.medical/patient-medical.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PatientMedicalHistoryComponent } from './components/patient.medical.history/patient-medical-history.component';
import { PatientInsuranceComponent } from './components/patient.insurance/patient-insurance.component';
import { PatientDocumentComponent } from './components/patient.document/patient-document.component';
import { PatientAgreementComponent } from './components/patient.agreement/patient-agreement.component';
import { PatientSignatureComponent } from './components/patient.signature/patient-signature.component';
import { PatientSummaryComponent } from './components/patient.summary/patient-summary.component';


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
    PatientMedicalComponent,
    PatientMedicalHistoryComponent,
    PatientInsuranceComponent,
    PatientDocumentComponent,
    PatientAgreementComponent,
    PatientSignatureComponent,
    PatientSummaryComponent,
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
    AccordionModule,
    AutocompleteLibModule,
  ],
})
export class PatientDigitalIntakeModule { }
