import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PatientConditions } from 'src/app/modules/patient.questionnaire/components/medical.history.information/create.patient.conditions/patient.conditions';
import { IPatientCondition } from 'src/app/modules/patient.questionnaire/components/medical.history.information/patient.condition';

@Component({
  selector: 'patient-medical-history',
  templateUrl: './patient-medical-history.component.html',
  styleUrls: ['./patient-medical-history.component.css']
})
export class PatientMedicalHistoryComponent implements OnInit {

  constructor() { }
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
      heightValue = heightValue * 0.393701;

    } else {
      // Convert inch to cm (1 inch = 2.54 cm)
      heightValue = heightValue / 0.393701;
    }
    this.form?.get('medicalhistory')?.get('height')?.setValue(heightValue, { emitEvent: false });
  }
  convertWeight(checked: boolean) {
    var weightValue: number = this.form?.get('medicalhistory')?.get('weight')?.value;
    if (checked) {
      weightValue = weightValue / 2.20462;
    } else {
      weightValue = weightValue * 2.20462
    }
    this.form?.get('medicalhistory')?.get('weight')?.setValue(weightValue, { emitEvent: false });
  }
}
