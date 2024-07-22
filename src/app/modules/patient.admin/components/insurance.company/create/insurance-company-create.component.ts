import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
import { Clinic } from '../../../models/clinic.model';
import { InsuranceCompany } from '../../../models/insurance.company.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'insurance-company-create',
  templateUrl: './insurance-company-create.component.html',
  styleUrls: ['./insurance-company-create.component.css']
})
export class InsuranceCompanyCreateComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
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
    console.log(this.selectedCompany)
    if (this.selectedCompany !== undefined) {
      this.getSelectedInsuranceCompany(this.selectedCompany);
    }
    this.createInsuranceCompanyform();
    this.getClinics();
  }
  private getSelectedInsuranceCompany(id: number) {
    this.insuranceCompanyService.getById(id).subscribe((result: any) => {
      this.insuranceCompany = result.body;
      this.fillInsuranceCompanyForm();
    }, error => {
      console.log('error getting selected insurance comapny')
    })
  }
  private getClinics() {
    this.clinicService.getActive().subscribe(response => {
      response.body?.forEach(element => {
        if (this.selectedCompany) {
          var isClinicFound = this.insuranceCompany.clinics?.some(clinic => {
            return clinic.id === element.id
          })
          if (isClinicFound) {
            element.selected = true
          }
        }
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
      'insurance-company-status': new FormControl(true, [Validators.required]),
    })
  }
  create() {
    if (this.insuranceCompanyForm?.valid) {
      this.isValidForm = false;
      this.fillInsuranceCompanyModel();
      this.insuranceCompanyService.create(this.insuranceCompany).subscribe(result => {
        if (!this.selectedCompany) {
          this.changeVisibility.emit('close-create');
          this.toastrService.success('Insurance Company Created.')
        } else {
          this.changeVisibility.emit('close-edit');
          this.toastrService.success('Insurance Company Updated.');
        }
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
      id: this.selectedCompany !== undefined ? this.insuranceCompany.id : null,
      name: this.insuranceCompanyForm.get('insurance-company-name')?.value,
      address: null,
      clinics: this.createClinics(this.insuranceCompanyForm.get('clinic')?.value),
      status: this.insuranceCompanyForm.get('insurance-company-status')?.value,
    }
    console.log(JSON.stringify(this.insuranceCompany))
  }
  private fillInsuranceCompanyForm() {
    console.log(JSON.stringify(this.insuranceCompany))
    this.insuranceCompanyForm.get('insurance-company-name')?.setValue(this.insuranceCompany.name);
    this.insuranceCompanyForm.get('insurance-company-status')?.setValue(this.insuranceCompany.status);
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
  private getClinicsId(clinics: Clinic[]): Clinic[] {
    for (var i = 0; i < clinics.length; i++) {
      clinics[i].selected = true;
    }
    return clinics;
  }
}
