import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Address } from 'src/app/models/patient/address.info.model';
import { PatientEssentialInformation } from 'src/app/modules/patient.questionnaire/models/intake/essential/patient.essential.information';
import { PatientAddress } from 'src/app/modules/patient.questionnaire/models/intake/essential/patienta.ddress';
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
    this.fillPateintEssentialInformation();
    this.fillPatientAddressInformation();
  }
  submit() {

  }
  private fillPateintEssentialInformation() {
    var patientEssentialInformation: PatientEssentialInformation
    this.form.get('basic')?.valueChanges.forEach(selected => {
      patientEssentialInformation = {
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
    this.form.get('address')?.valueChanges.forEach(selected => {
      var address: PatientAddress = {
        first: selected.firstAddress,
        second: selected.secondAddress,
        state: selected.state,
        zipCode: selected.zipCode
      };
      this.pateint.patientEssentialInformation!.address = address;
    });
  }

  private fillPatientAddressInformation() {

  }
}
