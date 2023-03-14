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
  SmartTableModule,
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
} from '@coreui/angular-pro';

import {
  EssentialInfoComponent,
  AddressInformationComponent,
  MedicalInfoComponent,
  InsuranceInformationComponent,
  WorkerCompComponent,
  WorkerNotCompComponent

} from './index';
import { QuestionnaireAddComponent } from './components/questionnaire.add/questionnaire-add.component';


@NgModule({
  declarations: [
    EssentialInfoComponent,
    AddressInformationComponent,
    InsuranceInformationComponent,
    QuestionnaireAddComponent,
    MedicalInfoComponent,
    WorkerCompComponent,
    WorkerNotCompComponent
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
    SmartTableModule,
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
    FormsModule
  ]
})
export class PatientQuestionnaireModule { }
