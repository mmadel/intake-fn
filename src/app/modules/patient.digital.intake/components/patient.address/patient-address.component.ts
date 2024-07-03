import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { states } from 'src/app/modules/common/components/address/state-data-store';

@Component({
  selector: 'patient-address',
  templateUrl: './patient-address.component.html',
  styleUrls: ['./patient-address.component.css']
})
export class PatientAddressComponent implements OnInit {
  @Input() form: FormGroup;
  states: string[] = states;
  constructor() { }

  ngOnInit(): void {
  }

}
