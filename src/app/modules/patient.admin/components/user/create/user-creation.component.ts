import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/common';
import { countries } from 'src/app/modules/common/components/address/country-data-store';
import { Countries } from 'src/app/modules/common/components/address/model/country.model';
import { states } from 'src/app/modules/common/components/address/state-data-store';
import { User } from 'src/app/modules/security/model/user';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user/user.service';

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
  countries: Countries[] = countries;
  states: string[] = states;
  userRoles: UserRole[] = [
    { name: "Administrator", value: "administrator" },
    { name: "Normal User", value: "normal" }
  ]
  errorMessage: string | null;
  returnClinics: Clinic[] = new Array();
  @ViewChild('userCreateForm') userCreateForm: NgForm;
  form = {
    name: null,
    password: null,
    useraddress: null,
    useraddresscountry: null,
    useraddressstate: null,
    useraddressprovince: null,
    useraddresscity: null,
    useraddresszipcode: null,
    userrole: null,
    selectedClinics: null
  };
  constructor(private clinicService: ClinicService,
    private userService: UserService,
    private router: Router,
    private localService: LocalService,
    private toastr: ToastrService) { }

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
  create(event: any) {
    if (event.submitter.innerHTML === ' Select all options ') {
      return;
    }
    var user: User = {
      id: null,
      name: this.form.name,
      password: this.localService.encrypt(this.form.password !== null ? this.form.password : ''),
      address: this.convertAddressToString(),
      userRole: this.form.userrole,
      clinics: this.createClinics(this.form.selectedClinics)
    }
    if (this.userCreateForm.valid) {
      this.userService.create(user).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/user/list')
        },
        (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error In Creation');
        });
    } else {
      console.log('not valid')
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError() {

  }
  convertAddressToString(): string {
    let address: string = ""
    address = address + this.form.useraddress + ",";
    address = address + this.form.useraddresscountry + ",";
    if (this.form.useraddressstate)
      address = address + this.form.useraddressstate + ",";
    if (this.form.useraddressprovince)
      address = address + this.form.useraddressprovince + ",";
    address = address + this.form.useraddresscity + ",";
    address = address + this.form.useraddresszipcode;
    return address
  }

  createClinics(ids: string[] | null) {
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
