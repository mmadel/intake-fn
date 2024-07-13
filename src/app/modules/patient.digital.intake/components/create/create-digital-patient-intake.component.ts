import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CacheClinicService } from '../../services/cache.clinic/cache-clinic.service';
import { InsuranceValidator } from './validators/insurance/insurance.validator';

@Component({
  selector: 'app-create-digital-patient-intake',
  templateUrl: './create-digital-patient-intake.component.html',
  styleUrls: ['./create-digital-patient-intake.component.css']
})
export class CreateDigitalPatientIntakeComponent implements OnInit {
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  patientForm: FormGroup
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
    });

    this.createPatientForm();
  }
  private createPatientForm() {
    const phoneRgx = new RegExp("^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)][-\s\.]?[0-9]{4,6}$");
    const zipCodeRgx = new RegExp("^\\d{5}(?:[-\s]\\d{4})?$");
    this.patientForm = new FormGroup({
      'basic': new FormGroup({
        'firstname': new FormControl(null, [Validators.required]),
        'middleName': new FormControl(null),
        'lastName': new FormControl(null, [Validators.required]),
        'dob': new FormControl(null, [Validators.required]),
        'gender': new FormControl(null, [Validators.required]),
        'marital': new FormControl(null, [Validators.required]),
        'phoneType': new FormControl(null, [Validators.required]),
        'phone': new FormControl(null, [Validators.required, Validators.min(15), Validators.pattern(phoneRgx)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'employment': new FormControl(null, [Validators.required]),
        'employmentCompany': new FormControl(null),

        'guarantorFirstName': new FormControl(null),
        'guarantorMiddleName': new FormControl(null),
        'guarantorLastName': new FormControl(null),
        'guarantorRelationship': new FormControl(null),

        'emergencyContact': new FormControl(null, [Validators.required]),
        'emergencyName': new FormControl(null, [Validators.required]),
        'emergencyPhone': new FormControl(null, [Validators.required]),
      }),
      'address': new FormGroup({
        'firstAddress': new FormControl(null, [Validators.required]),
        'secondAddress': new FormControl(null),
        'state': new FormControl(null, [Validators.required]),
        'zipCode': new FormControl(null, [Validators.required, Validators.min(10), Validators.pattern(zipCodeRgx)]),
      }),
      'medical': new FormGroup({
        'isReferring': new FormControl(null, [Validators.required]),
        'providerName': new FormControl(null),
        'providerNPI': new FormControl(null),
        'referringEntity': new FormControl(null),
        'appointmentBooking': new FormControl(null, [Validators.required]),
        'isPrimaryDoctor': new FormControl(null, [Validators.required]),
        'isFamilyDoctorRequest': new FormControl(false, [Validators.required]),
        'isReceivedPhysicalTherapy': new FormControl(null, [Validators.required]),
        'PhysicalTherapyLocation': new FormControl(null),
        'PhysicalTherapyNumber': new FormControl(null),
      }),
      'medicalhistory': new FormGroup({
        'height': new FormControl(null, [Validators.required]),
        'heightUnit': new FormControl(false),
        'weight': new FormControl(null, [Validators.required]),
        'weightUnit': new FormControl(false),
        'evaluationReason': new FormControl(null, [Validators.required]),
        'patientConditions': new FormControl(null, [Validators.required]),
        'prescriptionMedication': new FormControl(null, [Validators.required]),
        'isMetalImplants': new FormControl(false, [Validators.required]),
        'isXRay': new FormControl(false, [Validators.required]),
        'isXRayValue': new FormControl(null),
        'isPacemaker': new FormControl(false, [Validators.required]),
        'surgeriesList': new FormControl(null, [Validators.required]),
      }),
      'insurance': new FormGroup({
        'type': new FormControl(false, [Validators.required]),

        'compensation-related-injury': new FormControl(null),
        'compensation-accident-date': new FormControl(null),
        'compensation-wroker-status': new FormControl(null),
        'compensation-insurance-company': new FormControl(null),
        'compensation-claim-number': new FormControl(null),
        'compensation-address-type': new FormControl(null),
        'compensation-first-address': new FormControl(null),
        'compensation-second-address': new FormControl(null),
        'compensation-state': new FormControl(null),
        'compensation-city': new FormControl(null),
        'compensation-zipcode': new FormControl(null),
        'compensation-phone': new FormControl(null),
        'compensation-fax': new FormControl(null),
        'compensation-adjuster-first-name': new FormControl(null),
        'compensation-adjuster-middle-name': new FormControl(null),
        'compensation-adjuster-last-name': new FormControl(null),
        'compensation-adjuster-phone': new FormControl(null),
        'compensation-attorney-first-name': new FormControl(null),
        'compensation-attorney-middle-name': new FormControl(null),
        'compensation-attorney-last-name': new FormControl(null),
        'compensation-attorney-phone': new FormControl(null),
        'compensation-case-status': new FormControl(null),

        'commercial-insurance-company': new FormControl(null),
        'commercial-member-id': new FormControl(null),
        'commercial-ploicy-id': new FormControl(null),
        'commercial-ploicyHolder-relationship': new FormControl(null),
        'commercial-ploicyHolder-relationship-first-name': new FormControl(null),
        'commercial-ploicyHolder-relationship-middle-name': new FormControl(null),
        'commercial-ploicyHolder-relationship-last-name': new FormControl(null),
        'commercial-ploicyHolder-relationship-phone': new FormControl(null),
        'commercial-ploicyHolder-relationship-employer': new FormControl(null),
        'commercial-is-secondary-insurance': new FormControl(false),
        'commercial-is-medicare-coverage': new FormControl(false),
        'commercial-is-secondary-insurance-insurance-company': new FormControl(null),
        'commercial-is-secondary-insurance-member-id': new FormControl(null),
        'commercial-is-secondary-insurance-first-name': new FormControl(null),
        'commercial-is-secondary-insurance-middle-name': new FormControl(null),
        'commercial-is-secondary-insurance-last-name': new FormControl(null),
        'commercial-is-secondary-insurance-medicare-coverage-first-name': new FormControl(null),
        'commercial-is-secondary-insurance-medicare-coverage-middle-name': new FormControl(null),
        'commercial-is-secondary-insurance-medicare-coverage-last-name': new FormControl(null),
        'commercial-is-secondary-insurance-medicare-coverage-phone': new FormControl(null),
      }),
      'document': new FormGroup({
        'id-front': new FormControl(null, [Validators.required]),
        'id-back': new FormControl(null, [Validators.required]),
        'insurance-fornt': new FormControl(null, [Validators.required]),
        'insurance-back': new FormControl(null, [Validators.required])
      }),
      'agreement': new FormGroup({
        'release-Information': new FormControl(null, [Validators.required]),
        'financial-responsibility': new FormControl(null, [Validators.required]),
        'financial-agreement': new FormControl(null, [Validators.required]),
        'Insurance-agreement': new FormControl(null, [Validators.required]),
        'hipaa-acknowledgement': new FormControl(null, [Validators.required]),
        'cupping-agreement': new FormControl(null),
        'pelvic-agreement': new FormControl(null),
        'photo-video-agreement': new FormControl(null),
      }),
      'signature': new FormGroup({
        'generatesign': new FormControl(null),
        'drawsign': new FormControl(null)
      }),
      'summary': new FormGroup({

      })
    })
    this.setAddressConditionalValidators()
    this.setMedicalConditionalValidatos()
    this.setReceivedPhysicalTherapyValidator();
    this.setXRayValidator();
    this.setGuarantorValidators();
    InsuranceValidator.addValidator(this.patientForm)
  }
  private setAddressConditionalValidators() {
    this.patientForm.valueChanges.subscribe((value: any) => {
      var employmentValue = value?.['basic'].employment
      if (employmentValue && employmentValue === 'Employed') {
        this.patientForm.get('basic')?.get('employmentCompany')?.setValidators(Validators.required)
      } else {
        this.patientForm.get('basic')?.get('employmentCompany')?.setValidators(null)
        this.patientForm.get('basic')?.get('employmentCompany')?.setErrors(null)
      }
    })
  }

  private setMedicalConditionalValidatos() {
    this.patientForm.get('medical')?.get('isReferring')?.valueChanges.subscribe((value: any) => {
      if (value === 'yes') {
        this.patientForm.get('medical')?.get('providerNPI')?.setValidators(Validators.required)
        this.patientForm.get('medical')?.get('providerName')?.setValidators(Validators.required)
        this.patientForm.get('medical')?.get('providerNPI')?.updateValueAndValidity();
        this.patientForm.get('medical')?.get('providerName')?.updateValueAndValidity();
      }
      if (value === 'no') {
        this.patientForm.get('medical')?.get('providerNPI')?.clearValidators();
        this.patientForm.get('medical')?.get('providerNPI')?.setErrors(null);
        this.patientForm.get('medical')?.get('providerNPI')?.updateValueAndValidity();

        this.patientForm.get('medical')?.get('providerName')?.clearValidators();
        this.patientForm.get('medical')?.get('providerName')?.setErrors(null);
        this.patientForm.get('medical')?.get('providerName')?.updateValueAndValidity();
      }
    })
  }
  private setReceivedPhysicalTherapyValidator() {
    this.patientForm.get('medical')?.get('isReceivedPhysicalTherapy')?.valueChanges.subscribe((value: any) => {
      if (value === 'yes') {
        this.patientForm.get('medical')?.get('PhysicalTherapyLocation')?.setValidators(Validators.required)
        this.patientForm.get('medical')?.get('PhysicalTherapyNumber')?.setValidators(Validators.required)
        this.patientForm.get('medical')?.get('PhysicalTherapyLocation')?.updateValueAndValidity();
        this.patientForm.get('medical')?.get('PhysicalTherapyNumber')?.updateValueAndValidity();
      } else {
        this.patientForm.get('medical')?.get('PhysicalTherapyLocation')?.clearValidators();
        this.patientForm.get('medical')?.get('PhysicalTherapyLocation')?.setErrors(null);
        this.patientForm.get('medical')?.get('PhysicalTherapyLocation')?.updateValueAndValidity();

        this.patientForm.get('medical')?.get('PhysicalTherapyNumber')?.clearValidators();
        this.patientForm.get('medical')?.get('PhysicalTherapyNumber')?.setErrors(null);
        this.patientForm.get('medical')?.get('PhysicalTherapyNumber')?.updateValueAndValidity();
      }
    })
  }
  private setXRayValidator() {
    this.patientForm.get('medicalhistory')?.get('isXRay')?.valueChanges.subscribe((value: any) => {
      if (value) {
        this.patientForm.get('medicalhistory')?.get('isXRayValue')?.setValidators(Validators.required)
        this.patientForm.get('medicalhistory')?.get('isXRayValue')?.updateValueAndValidity();
      } else {
        this.patientForm.get('medicalhistory')?.get('isXRayValue')?.clearValidators();
        this.patientForm.get('medicalhistory')?.get('isXRayValue')?.setErrors(null);
        this.patientForm.get('medicalhistory')?.get('isXRayValue')?.updateValueAndValidity();
      }
    })
  }
  private setGuarantorValidators() {

    this.patientForm.get('basic')?.get('dob')?.valueChanges.subscribe(date => {
      var patientAge = moment().diff(date, 'y')
      var isGuarantor: boolean = patientAge < 21 ? true : false;
      if (isGuarantor) {
        this.patientForm.get('basic')?.get('guarantorFirstName')?.setValidators(Validators.required)
        this.patientForm.get('basic')?.get('guarantorLastName')?.setValidators(Validators.required)
        this.patientForm.get('basic')?.get('guarantorRelationship')?.setValidators(Validators.required)
      } else {
        this.patientForm.get('basic')?.get('guarantorFirstName')?.setValidators(null)
        this.patientForm.get('basic')?.get('guarantorFirstName')?.setErrors(null)

        this.patientForm.get('basic')?.get('guarantorLastName')?.setValidators(null)
        this.patientForm.get('basic')?.get('guarantorLastName')?.setErrors(null)

        this.patientForm.get('basic')?.get('guarantorRelationship')?.setValidators(null)
        this.patientForm.get('basic')?.get('guarantorRelationship')?.setErrors(null)
      }

    })

  }
}
