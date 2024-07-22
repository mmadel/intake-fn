import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/common';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { noSpecialCharactersValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/special.characters.validator';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user/user.service';
import { EmailValidator } from 'src/app/modules/patient.digital.intake/components/create/validators/custom.validation/email.validator';
import { User } from 'src/app/modules/security/model/user';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';

interface UserRole {
  name: string;
  value: string
}
@Component({
  selector: 'user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  @Input() selectedUser: string
  @Output() changeVisibility = new EventEmitter<string>()
  states: string[] = states;
  userForm: FormGroup
  isValidForm: boolean = false;
  validEmail: boolean | undefined = undefined;
  validUserName: boolean | undefined = undefined;
  validUserNameMessage: string | undefined = undefined
  validEmailMessage: string | undefined = undefined
  userRoles: UserRole[] = [
    { name: "Administrator", value: "administrator" },
    { name: "Normal User", value: "normal" }
  ]
  returnClinics: Clinic[] = new Array();
  user: User
  constructor(private clinicService: ClinicService,
    private userService: UserService,
    private router: Router,
    private localService: LocalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getClinics();
    this.createUserForm();
    this.checkUserName();
    this.checkEmail()
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
      'username': new FormControl(null, [Validators.required, noSpecialCharactersValidator()]),
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
  create() {
    if (this.userForm?.valid) {
      this.isValidForm = false;
      if (!this.selectedUser) {
        this.changeVisibility.emit('close-create');
        this.toastrService.success('Clinic Created');
      }
      else {
        this.changeVisibility.emit('close-edit');
        this.toastrService.success('Clinic Updated');
      }
    } else {
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
  private fillUserModel() {
    this.user = {
      id: null,
      name: this.userForm.get('username')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      userRole: this.userForm.get('userRole')?.value,
      address: '',
      clinics: this.createClinics(this.userForm.get('clinics')?.value),
    }
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
  private checkUserName() {
    this.userForm.get('username')?.valueChanges
      .pipe(
        filter(text => {
          if (text === '') {
            this.validUserName = undefined;
            return false;
          }
          if (text === undefined) {
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
        }),
        switchMap((value: any) => {
          return this.userService.checkUserName(value)
            .pipe(
              finalize(() => {
              }),
            )
        }
        )
      ).subscribe((check: any) => {
        this.validUserName = check;
        if (!check) {
          this.validUserNameMessage = 'username is already exists';
        }
      },
        () => {
        });
  }
  private checkEmail() {
    this.userForm.get('email')?.valueChanges
      .pipe(
        filter(text => {
          if (text === '') {
            this.validEmail = undefined;
            return false;
          }
          if (text === undefined) {
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
        }),
        switchMap((value) => {
          return this.userService.checkEmail(value)
            .pipe(
              finalize(() => {
              }),
            )
        }
        )
      ).subscribe((check: any) => {
        this.validEmail = check;
        if (!check) {
          this.validEmailMessage = 'Email is already exists';
        }
      },
        error => {
        });
  }
}
