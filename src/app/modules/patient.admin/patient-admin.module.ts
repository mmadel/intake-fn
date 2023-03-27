import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientAdminRoutingModule } from './patient-admin-routing.module';

import {
  PatientListComponent,
  ValidationListComponent
} from './index';
import { IconModule } from '@coreui/icons-angular';
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
  SmartPaginationModule,
  ToastModule ,
  CalloutModule
} from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PatientListComponent,
    ValidationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientAdminRoutingModule,
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
    IconModule,
    SmartPaginationModule,
    ToastModule,
    CalloutModule
  ]
})
export class PatientAdminModule { }