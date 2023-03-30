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




@NgModule({
  declarations: [
    AddressComponent
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
    AddressComponent
  ]
})
export class PatientCommonModule { }
