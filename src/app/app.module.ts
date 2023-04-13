import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import {
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


} from '@coreui/angular-pro';


import {
  DefaultLayoutComponent,
  DefaultHeaderComponent,
  DefaultFooterComponent,
  DefaultAdminLayoutComponent,
  AdminHeaderComponent
} from './core';
import { PatientService } from './modules/patient.questionnaire/service/patient.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientListService } from './modules/patient.admin/services/patient-list.service';
import { AuthInterceptor } from './modules/security';



const APP_CONTAINERS = [
  DefaultHeaderComponent,
  DefaultFooterComponent,
  DefaultLayoutComponent
];

const ADMIN_APP_CONTAINERS = [
  DefaultAdminLayoutComponent,
  AdminHeaderComponent
]
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ...ADMIN_APP_CONTAINERS, AdminHeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AppRoutingModule,
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
    ReactiveFormsModule,
    IconModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    PatientService,
    PatientListService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
