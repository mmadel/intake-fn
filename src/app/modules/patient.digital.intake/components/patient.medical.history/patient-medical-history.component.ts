import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-medical-history',
  templateUrl: './patient-medical-history.component.html',
  styleUrls: ['./patient-medical-history.component.css']
})
export class PatientMedicalHistoryComponent implements OnInit {

  constructor() { }
  @Input() form: FormGroup;
  ngOnInit(): void {
  }

}
