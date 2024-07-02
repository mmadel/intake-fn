import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-basic',
  templateUrl: './patient-basic.component.html',
  styleUrls: ['./patient-basic.component.css']
})
export class PatientBasicComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
