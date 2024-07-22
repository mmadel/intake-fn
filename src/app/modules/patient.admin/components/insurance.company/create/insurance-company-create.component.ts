import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
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
  @Input() selectedCompany: number
  insuranceCompanyForm: FormGroup
  isValidForm: boolean = false;
  returnClinics: Clinic[] = new Array();
  insuranceCompany: InsuranceCompany
  constructor(
    private clinicService: ClinicService,
    private insuranceCompanyService: InsuranceCompanyService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createInsuranceCompanyform()
    this.clinicService.getActive().subscribe(response => {
      response.body?.forEach(element => {
        this.returnClinics?.push(element)
      });
    },
      error => {
        console.log(error)
      },
    )
  }
  private createInsuranceCompanyform() {
    this.insuranceCompanyForm = new FormGroup({
      'insurance-company-name': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'clinic': new FormControl(null, [Validators.required]),
    })
  }
  create() {
    if (this.insuranceCompanyForm?.valid) {
      this.isValidForm = false;
      this.fillInsuranceCompanyModel();
      this.insuranceCompanyService.create(this.insuranceCompany).subscribe(result => {
        this.toastrService.success('Insurance Company Created.')
      }, error => {
        this.toastrService.success('Erro during creating insurance company')
      })
    } else {
      this.isValidForm = true;
      Object.keys(this.insuranceCompanyForm.controls).forEach(field => {
        const control = this.insuranceCompanyForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.scrollUp()
    }
  }
  private fillInsuranceCompanyModel() {
    this.insuranceCompany = {
      id: null,
      name: this.insuranceCompanyForm.get('insurance-company-name')?.value,
      address: null,
      clinics: this.createClinics(this.insuranceCompanyForm.get('clinic')?.value),
    }
  }  
  private scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
  private createClinics(ids: string[] | null) {
    var clinics: Clinic[] = new Array();
    ids?.forEach(element => {
      var clinic: Clinic = {
        id: Number(element),
        name: null,
        address: "",
        selected: false,

      }
      clinics.push(clinic)
    });
    return clinics;
  }
}
