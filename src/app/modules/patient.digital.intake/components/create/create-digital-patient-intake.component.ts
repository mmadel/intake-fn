import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
        'state': new FormControl(null,[Validators.required]),
        'zipCode': new FormControl(null,[Validators.required,Validators.min(10),Validators.pattern(zipCodeRgx)]),
      })
    })
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

}
