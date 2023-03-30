import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule, DateRangePickerModule, FormModule, GridModule, MultiSelectModule, SharedModule, TimePickerModule
} from '@coreui/angular-pro';

import { AddressComponent } from './components/address/address.component';
import { NumberonlyDirective } from './directives/numberonly.directive';
import { ZipcodeDirective } from './directives/zipcode.directive';
import { PhonePipe } from './pipes/phone.pipe';




@NgModule({
  declarations: [
    AddressComponent,
    NumberonlyDirective,
    ZipcodeDirective,
    PhonePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    SharedModule,
    FormModule,
    DateRangePickerModule,
    TimePickerModule,
    MultiSelectModule,
    
    
  ],
  exports: [
    AddressComponent,
    NumberonlyDirective,
    ZipcodeDirective,
    PhonePipe
  ]
})
export class PatientCommonModule { }
