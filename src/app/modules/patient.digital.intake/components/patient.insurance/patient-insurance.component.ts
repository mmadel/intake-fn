import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { InsuranceCompany } from 'src/app/modules/patient.admin/models/insurance.company.model';
import { InsuranceCompanyService } from 'src/app/modules/patient.admin/services/insurance.company/insurance-company.service';
import { CheckInvalidForm } from '../../util/invalid.form';
import { ValidationExploder } from '../create/validators/validation.exploder';

@Component({
  selector: 'patient-insurance',
  templateUrl: './patient-insurance.component.html',
  styleUrls: ['./patient-insurance.component.css']
})
export class PatientInsuranceComponent implements OnInit {
  maxDate:Date =new Date();
  @Input() stepper: MatStepper
  isValidForm: boolean = false;
  @Input() form: FormGroup;
  InsuranceCompanies: InsuranceCompany[] = new Array();
  constructor(private insuranceCompanyService: InsuranceCompanyService) { }
  ngOnInit(): void {
    this.insuranceCompanyService.get().subscribe((response) => {
      response.body?.forEach(element => {
        this.InsuranceCompanies?.push(element);
      });
    })
  }
  next(){
    var insuranceForm:FormGroup =  this.form.get('insurance') as FormGroup
    CheckInvalidForm.check(insuranceForm)
    if (this.form.get('insurance')?.valid) {
      this.stepper.next();
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
      ValidationExploder.explode(this.form, 'insurance')      
    }
  }
}
