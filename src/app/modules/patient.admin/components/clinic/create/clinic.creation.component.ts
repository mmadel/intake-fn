import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicAddress } from 'src/app/models/common/basic.address';
import { countries } from 'src/app/modules/common/components/address/country-data-store';
import { Countries } from 'src/app/modules/common/components/address/model/country.model';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'clinic-creation',
  templateUrl: './clinic.creation.component.html',
  styleUrls: ['./clinic.creation.component.css']
})
export class ClinicCreationComponent implements OnInit {
  @Input() clinicId: number
  @Output() changeVisibility = new EventEmitter<string>()
  countries: Countries[] = countries;
  states: string[] = states;
  clinicForm: FormGroup
  isValidForm: boolean = false;
  clinic: Clinic;
  constructor(private clinicService: ClinicService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    if (this.clinicId !== undefined)
      this.getSelectedClinic()
    this.createClinicForm();
  }

  private getSelectedClinic() {
    this.clinicService.getById(this.clinicId.toString()).subscribe((selectedClinic: any) => {
      this.clinic = selectedClinic;
      this.fillClinicForm();
    }, error => {
      console.error('error getting selected clinic')
    })
  }
  private createClinicForm() {
    const zipCodeRgx = new RegExp("^\\d{5}(?:[-\s]\\d{4})?$");
    this.clinicForm = new FormGroup({
      'clinic-name': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'clinic-status': new FormControl(true, [Validators.required]),
      'first-address': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'second-address': new FormControl(null, noSpecialCharactersValidator()),
      'city-address': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'state-address': new FormControl(null, [Validators.required]),
      'zipcode-address': new FormControl(null, [Validators.required, Validators.min(10), Validators.pattern(zipCodeRgx)]),
    })
  }
  create() {
    if (this.clinicForm?.valid) {
      this.isValidForm = false;
      this.fillClinicModel();
      console.log(JSON.stringify(this.clinic))
      this.clinicService.create(this.clinic).subscribe(result => {
        if (!this.clinicId) {
          this.changeVisibility.emit('close-create');
          this.toastrService.success('Clinic Created');
        }
        else {
          this.changeVisibility.emit('close-edit');
          this.toastrService.success('Clinic Updated');
        }
      }, error => {
        console.log('error during create clinic')
        this.toastrService.success('Error. ' + JSON.stringify(error));
      })
    } else {
      this.isValidForm = true;
      Object.keys(this.clinicForm.controls).forEach(field => {
        const control = this.clinicForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.scrollUp()
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
  private fillClinicModel() {
    this.clinic = {
      id: this.clinicId,
      name: null,
      address: ''
    }
    var clinicAddress: BasicAddress = {
      firstAddress: this.clinicForm.controls['first-address'].value,
      secondAddress: this.clinicForm.controls['second-address'].value,
      city: this.clinicForm.controls['city-address'].value,
      state: this.clinicForm.controls['state-address'].value,
      zipCode: this.clinicForm.controls['zipcode-address'].value
    }
    this.clinic.name = this.clinicForm.controls['clinic-name'].value
    this.clinic.clinicAddress = clinicAddress;
    this.clinic.status= this.clinicForm.controls['clinic-status'].value
  }
  private fillClinicForm() {
    this.clinicForm.controls['clinic-name'].setValue(this.clinic.name)
    this.clinicForm.controls['first-address'].setValue(this.clinic.clinicAddress?.firstAddress)
    this.clinicForm.controls['second-address'].setValue(this.clinic.clinicAddress?.secondAddress)
    this.clinicForm.controls['city-address'].setValue(this.clinic.clinicAddress?.city)
    this.clinicForm.controls['state-address'].setValue(this.clinic.clinicAddress?.state)
    this.clinicForm.controls['zipcode-address'].setValue(this.clinic.clinicAddress?.zipCode)
    this.clinicForm.controls['clinic-status'].setValue(this.clinic.status)
  }
}
