import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from 'src/app/modules/common/components/address/country-data-store';
import { Countries } from 'src/app/modules/common/components/address/model/country.model';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-clinic.creation',
  templateUrl: './clinic.creation.component.html',
  styleUrls: ['./clinic.creation.component.css']
})
export class ClinicCreationComponent implements OnInit {
  countries: Countries[] = countries;
  states: string[] = states;
  clinicForm: FormGroup
  isValidForm: boolean = false;
  constructor() { }
  ngOnInit(): void {
    this.createClinicForm();
  }

  private createClinicForm(){
    const zipCodeRgx = new RegExp("^\\d{5}(?:[-\s]\\d{4})?$");
    this.clinicForm = new FormGroup({
      'clinic-name': new FormControl(null, [Validators.required,noSpecialCharactersValidator()]),
      'first-address': new FormControl(null, [Validators.required,noSpecialCharactersValidator()]),
      'second-address': new FormControl(null,noSpecialCharactersValidator()),
      'city-address': new FormControl(null, [Validators.required]),
      'state-address': new FormControl(null, [Validators.required]),
      'zipcode-address': new FormControl(null, [Validators.required,Validators.min(10), Validators.pattern(zipCodeRgx)]),
    })
  }
  create(){
    if (this.clinicForm?.valid) {
      this.isValidForm = false;
    }else{
      this.isValidForm = true;
      Object.keys(this.clinicForm.controls).forEach(field => {
        const control = this.clinicForm.get(field);
        control?.markAsTouched({ onlySelf: true });
    });
    this.scrollUp()
    }
  }
  private  scrollUp() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.scrollTo(0, 0);
        }
    })();
}
}
