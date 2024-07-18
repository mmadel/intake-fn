import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PatientConditions } from 'src/app/modules/patient.questionnaire/components/medical.history.information/create.patient.conditions/patient.conditions';
import { IPatientCondition } from 'src/app/modules/patient.questionnaire/components/medical.history.information/patient.condition';
import { ValidationExploder } from '../create/validators/validation.exploder';

@Component({
  selector: 'patient-medical-history',
  templateUrl: './patient-medical-history.component.html',
  styleUrls: ['./patient-medical-history.component.css']
})
export class PatientMedicalHistoryComponent implements OnInit {

  constructor() { }
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  @Input() form: FormGroup;
  initHeight: number = 0;
  initWeight: number
  patientConditions: IPatientCondition[] = PatientConditions.create();
  ngOnInit(): void {
    this.form?.get('medicalhistory')?.get('heightUnit')?.valueChanges.subscribe(value => {
      this.convertHeight(value);
    })
    this.form?.get('medicalhistory')?.get('weightUnit')?.valueChanges.subscribe(value => {
      this.convertWeight(value);
    })
  }
  convertHeight(checked: boolean) {
    var heightValue: number = this.form?.get('medicalhistory')?.get('height')?.value;
    if (checked) {
      // Convert cm to inch (1 cm = 0.393701 inch)
      heightValue = Number((heightValue * 0.393701).toFixed(1));

    } else {
      // Convert inch to cm (1 inch = 2.54 cm)
      heightValue = Math.round(heightValue / 0.393701)
    }
    this.form?.get('medicalhistory')?.get('height')?.setValue(heightValue, { emitEvent: false });
  }
  convertWeight(checked: boolean) {
    var weightValue: number = this.form?.get('medicalhistory')?.get('weight')?.value;
    if (checked) {
      
      weightValue = Number((weightValue / 2.20462).toFixed(1));
    } else {
      weightValue = Math.round(weightValue * 2.20462)
    }
    this.form?.get('medicalhistory')?.get('weight')?.setValue(weightValue, { emitEvent: false });
  }
  next(){
    if (this.form.get('medicalhistory')?.valid) {
      this.stepper.next();
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
      ValidationExploder.explode(this.form, 'medicalhistory')      
    }
  }
}
