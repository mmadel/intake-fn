import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

import { PatientQuestionnaireRoutingModule } from './patient-questionnaire-routing.module';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  GridModule,
  SharedModule,
  TableModule,
  FormModule,
  DatePickerModule,
  DropdownModule,
  ButtonGroupModule,
  ListGroupModule,
  TooltipModule,
  TabsModule,
  NavModule,
  DateRangePickerModule,
  TimePickerModule,
  ProgressModule,
  MultiSelectModule,
  AccordionModule
} from '@coreui/angular-pro';

import {
  QuestionnaireAddComponent,
  EssentialInfoComponent,
  AddressInformationComponent,
  MedicalInfoComponent,
  InsuranceInformationComponent,
  WorkerCompComponent,
  WorkerNotCompComponent,
  MedicalHistoryInformationComponent,
  AggreementsComponent,
  UploadPhotoComponent,
  SummaryComponent,
  PatientsignatureComponent
} from './index';
import { PatientCommonModule } from '../common';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    EssentialInfoComponent,
    AddressInformationComponent,
    InsuranceInformationComponent,
    QuestionnaireAddComponent,
    MedicalInfoComponent,
    WorkerCompComponent,
    WorkerNotCompComponent,
    MedicalHistoryInformationComponent,
    AggreementsComponent,
    SummaryComponent,
    UploadPhotoComponent,
    PatientsignatureComponent,
  ],
  imports: [
    CommonModule,
    PatientQuestionnaireRoutingModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    SharedModule,
    TableModule,
    FormModule,
    DatePickerModule,
    DropdownModule,
    ButtonGroupModule,
    ListGroupModule,
    TooltipModule,
    TabsModule,
    NavModule,
    DateRangePickerModule,
    TimePickerModule,
    ProgressModule,
    IconModule,
    FormsModule,
    MultiSelectModule,
    AccordionModule,
    PatientCommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PatientQuestionnaireModule { }
