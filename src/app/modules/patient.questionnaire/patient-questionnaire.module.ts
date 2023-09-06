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
  faStar as fasStar
  , faPhoneVolume as faPhoneVolume
  , faCreditCard as faCreditCard
  , faTimeline as faTimeline
  , faChildReaching as faChildReaching
  , faHospitalUser as faHospitalUser
  , faCircleH as faCircleH
} from '@fortawesome/free-solid-svg-icons';

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    FontAwesomeModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PatientQuestionnaireModule { }
