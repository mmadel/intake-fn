import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

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
        'isFamilyDoctorRequest': new FormControl(null, [Validators.required]),
        'isReceivedPhysicalTherapy': new FormControl(null, [Validators.required]),
        'PhysicalTherapyLocation': new FormControl(null),
        'PhysicalTherapyNumber': new FormControl(null),
      }),
      'medicalhistory': new FormGroup({

      })
    })
    this.setAddressConditionalValidators()
    this.setMedicalConditionalValidatos()
    this.setReceivedPhysicalTherapyValidator();
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
}
