import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Address } from 'src/app/models/patient/address.info.model';
import { PatientEssentialInformation } from 'src/app/modules/patient.questionnaire/models/intake/essential/patient.essential.information';
import { PatientAddress } from 'src/app/modules/patient.questionnaire/models/intake/essential/patienta.ddress';
import { Patient } from 'src/app/modules/patient.questionnaire/models/intake/patient';
import { DoctorSource } from 'src/app/modules/patient.questionnaire/models/intake/source/doctor.source';
import { EntitySource } from 'src/app/modules/patient.questionnaire/models/intake/source/entity.source';
import { PatientSource } from "src/app/modules/patient.questionnaire/models/intake/source/patient.source";
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
    this.fillPatientSource();
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

  private fillPatientSource() {
    this.form.get('medical')?.get('isReferring')?.valueChanges.subscribe(value => {
      var doctorSource: DoctorSource = {};
      var entitySource: EntitySource = {};
      if (value === 'yes') {
        this.form.get('medical')?.get('providerName')?.valueChanges.subscribe(value => {
          console.log('######## ' + value)
          doctorSource.doctorName = value;
        })
        this.form.get('medical')?.get('providerNPI')?.valueChanges.subscribe(value => {
          console.log('######## ' + value)
          doctorSource.doctorNPI = value;
        })
      }
      if (value === 'no') {
        this.form.get('medical')?.get('referringEntity')?.valueChanges.subscribe(value => {
          entitySource.organizationName = value;
        })
      }
      var patientSource: PatientSource = {
        doctorSource: doctorSource,
        entitySource: entitySource
      }
      this.pateint.patientSource = patientSource;
      console.log(JSON.stringify(this.pateint))
    })
  }
}
