import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-agreement',
  templateUrl: './patient-agreement.component.html',
  styleUrls: ['./patient-agreement.component.css']
})
export class PatientAgreementComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
