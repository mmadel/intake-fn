import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { PatientEssentialInformation } from 'src/app/modules/patient.questionnaire/models/intake/essential/patient.essential.information';
import { Patient } from 'src/app/modules/patient.questionnaire/models/intake/patient';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.css']
})
export class PatientSummaryComponent implements OnInit {
  @Input() form: FormGroup;
  pateint: Patient = {}
  constructor() { }

  ngOnInit(): void {
    this.fillPateintEssentialInformation()
  }
  submit() {

  }
  private fillPateintEssentialInformation() {
    this.form.get('basic')?.valueChanges.forEach(selected => {
      var patientEssentialInformation: PatientEssentialInformation = {
        patientName: {
          firstName: selected.firstname,
          middleName: selected.middleName,
          lastName: selected.lastName,
        },
        birthDate_str: moment(selected.dob).format("MM/DD/YYYY"),
        gender: selected.gender,
        maritalStatus: selected.marital,
        patientPhone: {
          phoneType: selected.phoneType,
          phone: selected.phone
        },
        email: selected.email,
        patientEmployment: {
          employmentStatus: selected.employment,
          employmentCompany: selected.employmentCompany
        },
        patientEmergencyContact: {
          emergencyName: selected.emergencyName,
          emergencyPhone: selected.emergencyPhone,
          emergencyRelation: selected.emergencyContact
        }
      };
      this.pateint.patientEssentialInformation = patientEssentialInformation
    })
  }

}
