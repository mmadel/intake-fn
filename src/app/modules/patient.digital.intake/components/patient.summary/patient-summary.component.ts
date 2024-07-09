import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { filter, tap } from 'rxjs';
import { MedicareCoverage } from 'src/app/models/questionnaire/Insurance/medicare.coverage';
import { PatientRelationship } from 'src/app/models/questionnaire/Insurance/patient.relationship';
import { PatientEssentialInformation } from 'src/app/modules/patient.questionnaire/models/intake/essential/patient.essential.information';
import { PatientAddress } from 'src/app/modules/patient.questionnaire/models/intake/essential/patienta.ddress';
import { PatientCommercialInsurance } from 'src/app/modules/patient.questionnaire/models/intake/Insurance/patient.commercial.insurance';
import { PatientInsurance } from 'src/app/modules/patient.questionnaire/models/intake/Insurance/patient.insurance';
import { PatientInsuranceCompensationNoFault } from 'src/app/modules/patient.questionnaire/models/intake/Insurance/patient.insurance.compensation.no.fault';
import { SecondaryInsurance } from 'src/app/modules/patient.questionnaire/models/intake/Insurance/secondary.insurance';
import { PatientMedical } from "src/app/modules/patient.questionnaire/models/intake/medical/patient.medical";
import { PatientMedicalHistory } from 'src/app/modules/patient.questionnaire/models/intake/medical/patient.medical.history';
import { PatientPhysicalTherapy } from 'src/app/modules/patient.questionnaire/models/intake/medical/patient.physical.therapy';
import { Patient } from 'src/app/modules/patient.questionnaire/models/intake/patient';
import { DoctorSource } from 'src/app/modules/patient.questionnaire/models/intake/source/doctor.source';
import { EntitySource } from 'src/app/modules/patient.questionnaire/models/intake/source/entity.source';
import { PatientSource } from "src/app/modules/patient.questionnaire/models/intake/source/patient.source";
import { PatientDocumentService } from '../../services/doument/patient-document.service';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.css']
})
export class PatientSummaryComponent implements OnInit {
  @Input() form: FormGroup;
  pateint: Patient = {}
  constructor(private patientDocumentService: PatientDocumentService) { }

  ngOnInit(): void {
    this.fillPateintEssentialInformation();
    this.fillPatientSource();
    this.fillPatientMedicalInformation();
    this.fillPatientMedicalHistoryInformation();
    this.fillPatientInsurance();
    this.patientDocumentService.selectedDocument$.pipe(
      filter(result => result !== null)
    ).subscribe((result: any) => {
      for (let file of result) {
      }
    })
  }
  submit() {
    console.log(JSON.stringify(this.pateint))
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
          doctorSource.doctorName = value;
        })
        this.form.get('medical')?.get('providerNPI')?.valueChanges.subscribe(value => {
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
    })
  }

  private fillPatientMedicalInformation() {
    var patientMedical: PatientMedical = {}
    var patientPhysicalTherapy: PatientPhysicalTherapy = {}
    this.form.get('medical')?.valueChanges.forEach(selected => {
      patientMedical.appointmentBooking = selected.appointmentBooking;
      patientMedical.primaryDoctor = selected.isPrimaryDoctor
      patientMedical.familyResultSubmission = selected.isFamilyDoctorRequest
      this.pateint.patientMedical = patientMedical;
    })
    this.form.get('medical')?.get('isReceivedPhysicalTherapy')?.valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.form.get('medical')?.get('PhysicalTherapyLocation')?.valueChanges.subscribe(value => {
          patientPhysicalTherapy.location = value
        })
        this.form.get('medical')?.get('PhysicalTherapyNumber')?.valueChanges.subscribe(value => {
          patientPhysicalTherapy.numberOfVisit = value
        })
        this.pateint.patientMedical!.hasPatientPhysicalTherapy = true;
        this.pateint.patientMedical!.patientPhysicalTherapy = patientPhysicalTherapy;
      } else {
        this.pateint.patientMedical!.hasPatientPhysicalTherapy = false;
        this.pateint.patientMedical!.patientPhysicalTherapy = undefined
      }

    })
  }
  private fillPatientMedicalHistoryInformation() {
    var patientMedicalHistory: PatientMedicalHistory = {};
    this.form.get('medicalhistory')?.valueChanges.forEach(select => {
      patientMedicalHistory.height = select.height
      patientMedicalHistory.heightUnit = select.heightUnit
      patientMedicalHistory.weight = select.weight
      patientMedicalHistory.weightUnit = select.weightUnit
      patientMedicalHistory.evaluationSubmission = select.evaluationReason;
      patientMedicalHistory.patientCondition = select.patientConditions
      patientMedicalHistory.medicationPrescription = select.prescriptionMedication
      patientMedicalHistory.scanningTest = select.isXRay
      patientMedicalHistory.scanningTestValue = select.isXRayValue
      patientMedicalHistory.pacemaker = select.isPacemaker
      patientMedicalHistory.metalImplantation = select.isMetalImplants
      patientMedicalHistory.surgeriesList = select.surgeriesList
      this.pateint.patientMedical!.patientMedicalHistory = patientMedicalHistory
    })
  }
  private fillPatientInsurance() {
    var patientInsurance: PatientInsurance = {}
    this.form.get('insurance')?.valueChanges.forEach(select => {
      if (!select.type) {

        patientInsurance = {
          patientInsuranceCompensationNoFault: this.fillPatientInsuranceCompensationNoFault(select),
          patientCommercialInsurance: undefined
        }
      }
      else {
        patientInsurance = {
          patientInsuranceCompensationNoFault: undefined,
          patientCommercialInsurance: this.fillPatientCommercialInsurance(select)
        }
      }
      this.pateint.patientInsurance = patientInsurance;
    })
  }
  private fillPatientInsuranceCompensationNoFault(selected: any) {
    var patientInsuranceCompensationNoFault: PatientInsuranceCompensationNoFault = {
      injuryType: selected['compensation-related-injury'],
      accidentDate_str: moment(selected['compensation-accident-date']).format("MM/DD/YYYY"),
      workerStatus: selected['compensation-wroker-status'],
      phone: selected['compensation-phone'],
      fax: selected['compensation-fax'],
      adjusterInfoName: selected['compensation-adjuster-last-name'] + ',' + selected['compensation-adjuster-first-name'],
      adjusterInfoPhone: selected['compensation-adjuster-phone'],
      attorneyInfoName: selected['compensation-attorney-last-name'] + ',' + selected['compensation-attorney-first-name'],
      attorneyInfoPhone: selected['compensation-attorney-phone'],
      caseStatus: selected['compensation-case-status'],
    }
    return patientInsuranceCompensationNoFault;
  }
  private fillPatientCommercialInsurance(selected: any) {
    var patientCommercialInsurance: PatientCommercialInsurance = {
      memberId: selected['commercial-member-id'],
      policyId: selected['commercial-ploicy-id'],
      relationship: selected['commercial-ploicyHolder-relationship'],
      hasSecondaryInsurance: selected['commercial-is-secondary-insurance'],
      hasMedicareCoverage: selected['commercial-is-medicare-coverage'],
    }
    if (patientCommercialInsurance.relationship !== 'Self') {
      var patientRelationship: PatientRelationship = {
        patientRelationshipFirstName: selected['commercial-ploicyHolder-relationship-first-name'],
        patientRelationshipMeddileName: selected['commercial-ploicyHolder-relationship-middle-name'],
        patientRelationshipLastName: selected['commercial-ploicyHolder-relationship-last-name'],
        patientRelationshipPhone: selected['commercial-ploicyHolder-relationship-phone'],
        employerName: selected['commercial-ploicyHolder-relationship-employer'],
      }
      patientCommercialInsurance.patientRelationship = patientRelationship;
    } else {
      patientCommercialInsurance.patientRelationship = undefined;
    }
    if (patientCommercialInsurance.hasSecondaryInsurance) {
      var secondaryInsurance: SecondaryInsurance = {
        policyHolderFirstName: selected['commercial-is-secondary-insurance-first-name'],
        policyHolderMiddleName: selected['commercial-is-secondary-insurance-middle-name'],
        policyHolderLastName: selected['commercial-is-secondary-insurance-last-name'],
        insuranceCompanyName: selected['commercial-is-secondary-insurance-insurance-company'],
        memberId: selected['commercial-is-secondary-insurance-member-id']
      }
      patientCommercialInsurance.secondaryInsurance = secondaryInsurance
    } else {
      patientCommercialInsurance.secondaryInsurance = undefined
    }
    if (patientCommercialInsurance.hasMedicareCoverage) {
      var medicareCoverage: MedicareCoverage = {
        employerFirstName: selected['commercial-is-secondary-insurance-medicare-coverage-first-name'],
        employerMeddileName: selected['commercial-is-secondary-insurance-medicare-coverage-middle-name'],
        employerLastName: selected['commercial-is-secondary-insurance-medicare-coverage-last-name'],
        employerPhone: selected['commercial-is-secondary-insurance-medicare-coverage-phone']
      }
      patientCommercialInsurance.medicareCoverage = medicareCoverage
    } else {
      patientCommercialInsurance.medicareCoverage = undefined;
    }
    return patientCommercialInsurance;
  }
}
