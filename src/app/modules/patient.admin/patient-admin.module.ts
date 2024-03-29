import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

import { PatientAdminRoutingModule } from './patient-admin-routing.module';
import {
  PatientListComponent,
  ValidationListComponent,
  RecommendationReportComponent,
  DashboardComponent,
  ClinicCreationComponent,
  ClinicListComponent,
  UserCreationComponent,
  UserListComponent,
  PatientCreateComponent,
  InsuranceCompanyCreateComponent,
  InsuranceCompanyListComponent,
  UserUpdateComponent,
  UpdateClinicComponent,
  AuditComponent,
  UserAuditComponent,
  UserClinicAuditComponent,
  UserInsuranceCompanyAuditComponent,
  UserPatientAuditComponent
} from './index';


import { PatientCommonModule } from '../common';
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
  ToastModule,
  CalloutModule,
  MultiSelectModule,
  WidgetModule,
  ProgressModule,
  AccordionModule

} from '@coreui/angular-pro';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    PatientListComponent,
    ValidationListComponent,
    RecommendationReportComponent,
    DashboardComponent,
    ClinicCreationComponent,
    ClinicListComponent,
    UserListComponent,
    UserCreationComponent,
    PatientCreateComponent,
    InsuranceCompanyCreateComponent,
    InsuranceCompanyListComponent,
    UserUpdateComponent, UpdateClinicComponent, AuditComponent, UserAuditComponent, UserClinicAuditComponent, UserInsuranceCompanyAuditComponent, UserPatientAuditComponent
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
    CalloutModule,
    MultiSelectModule,
    WidgetModule,
    ProgressModule,
    PatientCommonModule,
    QRCodeModule,
    AccordionModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PatientAdminModule { }
