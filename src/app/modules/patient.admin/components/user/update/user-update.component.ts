import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
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
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  countries: Countries[] = countries;
  states: string[] = states;
  userRoles: UserRole[] = [
    { name: "Administrator", value: "Administrator" },
    { name: "Normal User", value: "Normal" }
  ]
  resetpassword: boolean = false;
  userId: string | null;
  errorMessage: string | null;
  returnClinics: Clinic[] = new Array();
  @ViewChild('userCreateForm') userCreateForm: NgForm;
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clinicService: ClinicService,
    private router: Router,
    private localService: LocalService) { }

  form = {
    uuid: '',
    name: '',
    password: '',
    useraddress: '',
    useraddresscountry: '',
    useraddressstate: '',
    useraddressprovince: '',
    useraddresscity: '',
    useraddresszipcode: '',
    userrole: '',
    selectedClinics: [1]
  };
  capitalizeFirstLetter(value: string) {
    var v: string = value[0].toUpperCase() +
      value.slice(1)
    console.log(v)
    return v;
  }
  minusculeFirstLetter(value: string) {
    var v: string = value[0].toLowerCase() +
      value.slice(1)
    console.log(v)
    return v;
  }
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId') !== null ? this.activatedRoute.snapshot.paramMap.get('userId') : '';
    this.userService.getById(this.userId).subscribe((result) => {
      var addressParts: string[] = this.converStringToAddress(result.address)
      this.form.uuid = result.uuid;
      this.form.name = result.name !== null ? result.name : '';
      this.form.password = result.password !== null ? result.password : '';
      this.form.useraddress = result.address !== null ? addressParts[0] : '';
      this.form.useraddresscountry = result.address !== null ? addressParts[1] : '';
      if (this.form.useraddresscountry !== 'United States of America')
        this.form.useraddressprovince = result.address !== null ? addressParts[2] : '';
      else
        this.form.useraddressstate = result.address !== null ? addressParts[2] : '';
      this.form.useraddresscity = result.address !== null ? addressParts[3] : '';
      this.form.useraddresszipcode = result.address !== null ? addressParts[4] : '';
      this.form.userrole = result.userRole !== null ? this.capitalizeFirstLetter(result.userRole) : '';
      var clinicIds: number[] = _.map(result.clinics, (clinic) => {
        return clinic.id !== null ? clinic.id : 0;
      });
      this.clinicService.get().subscribe(response => {
        response.body?.forEach(element => {
          if (element.id !== null) {
            if (clinicIds.includes(element.id)) {
              element.selected = true;
            } else {
              element.selected = false;
            }
          }
          this.returnClinics?.push(element)
        });
      },
        error => {
          console.log(error)
        },
      )
    })
  }
  create() {
    var user: User = {
      id: null,
      uuid: this.form.uuid,
      name: this.form.name,
      password: this.localService.encrypt(this.form.password !== null ? this.form.password : ''),
      address: this.convertAddressToString(),
      userRole: this.minusculeFirstLetter(this.form.userrole),
      clinics: this.createClinics(this.form.selectedClinics)
    }
    if (this.userCreateForm.valid) {
      this.userService.update(user).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/user/list')
        },
        (error) => { this.errorMessage = error.error.error; });
    } else {
      console.log('not valid')
      this.errorMessage = 'Please enter valid data';
    }
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
  createClinics(ids: number[] | null) {

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
  resetError() {

  }
  converStringToAddress(address: string | null) {
    var result: string[] | undefined = address?.split(",")
    return result !== undefined ? result : ['']
  }
}
