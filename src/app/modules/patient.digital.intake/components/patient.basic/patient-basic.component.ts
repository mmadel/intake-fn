import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'patient-basic',
  templateUrl: './patient-basic.component.html',
  styleUrls: ['./patient-basic.component.css']
})
export class PatientBasicComponent implements OnInit {
  @Input() form: FormGroup;
  isGuarantor: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  checkAge(event: any) {
    var patientAge = moment().diff(event, 'y')
    this.isGuarantor = patientAge < 21 ? true : false;
  }
}
