import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinic } from '../../../models/clinic.model';
import { InsuranceCompany } from '../../../models/insurance.company.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'app-insurance-company-create',
  templateUrl: './insurance-company-create.component.html',
  styleUrls: ['./insurance-company-create.component.css']
})
export class InsuranceCompanyCreateComponent implements OnInit {
  errorMessage: string | null;
  returnClinics: Clinic[] = new Array();
  @ViewChild('insuranceCompanyCreateForm') insuranceCompanyCreateForm: NgForm;
  form = {
    name: null,
    selectedClinic: null
  };
  constructor(private router: Router,
    private clinicService: ClinicService,
    private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.clinicService.get().subscribe(response => {
      response.body?.forEach(element => {
        this.returnClinics?.push(element)
      });
    },
      error => {
        console.log(error)
      },
    )
  }
  create() {
    var created: InsuranceCompany = {
      id: null,
      name: this.form.name,
      address: null,
      clinic: {
        id: this.form.selectedClinic,
        name: null,
        address: '',
        selected: false
      }
    }
    if (this.insuranceCompanyCreateForm.valid) {
      this.insuranceCompanyService.create(created).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/insurance/company/list')
        },
        (error) => { console.log(error); });
    } else {
      console.log('not valid')
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError() {

  }
}
