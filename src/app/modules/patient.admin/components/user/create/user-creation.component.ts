import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/common';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user/user.service';
import {EmailValidator  } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/email.validator';

interface UserRole {
  name: string;
  value: string
}
@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  @Input() selectedUser: number
  states: string[] = states;
  userForm: FormGroup
  isValidForm: boolean = false;
  userRoles: UserRole[] = [
    { name: "Administrator", value: "administrator" },
    { name: "Normal User", value: "normal" }
  ]
  returnClinics: Clinic[] = new Array();
  constructor(private clinicService: ClinicService,
    private userService: UserService,
    private router: Router,
    private localService: LocalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClinics();
    this.createUserForm();
  }

  private getClinics() {
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
  private createUserForm() {
    const zipCodeRgx = new RegExp("^\\d{5}(?:[-\s]\\d{4})?$");
    this.userForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'lastName': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'email': new FormControl(null, [Validators.required, EmailValidator()]),
      'password': new FormControl(null, [Validators.required]),
      'first-address': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'second-address': new FormControl(null, noSpecialCharactersValidator()),
      'city-address': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
      'state-address': new FormControl(null, [Validators.required]),
      'zipcode-address': new FormControl(null, [Validators.required, Validators.min(10), Validators.pattern(zipCodeRgx)]),
      'userRole': new FormControl(null, [Validators.required]),
      'clinics': new FormControl(null, [Validators.required]),
    })
  }
  create(){
    if (this.userForm?.valid) {
      this.isValidForm = false;
    }else{
      this.isValidForm = true;
      this.isValidForm = true;
      Object.keys(this.userForm.controls).forEach(field => {
        const control = this.userForm.get(field);
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
}
