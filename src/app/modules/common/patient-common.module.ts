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
import { NumberonlyDirective } from '../directives/numberonly.directive';
import { ZipcodeDirective } from '../directives/zipcode.directive';
import { AddressComponent } from './components/address/address.component';




@NgModule({
  declarations: [
    AddressComponent,
    NumberonlyDirective,
    ZipcodeDirective
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
    ZipcodeDirective
  ]
})
export class PatientCommonModule { }
