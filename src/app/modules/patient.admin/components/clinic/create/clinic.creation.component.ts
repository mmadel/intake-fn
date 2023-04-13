import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/models/patient/address.info.model';
import { countries } from 'src/app/modules/common/components/address/country-data-store';
import { Countries } from 'src/app/modules/common/components/address/model/country.model';
import { states } from 'src/app/modules/common/components/address/state-data-store';
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
  @ViewChild('clinicCreateForm') clinicCreateForm: NgForm;
  form = {
    name: null,
    clinicaddressvalue: null,
    clinicaddresscountry: null,
    clinicaddressstate: null,
    clinicaddressprovince: null,
    clinicaddresscity: null,
    clinicaddresszipcode: null
  };
  errorMessage: string | null;
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
  }

  create() {
    var clinic: Clinic = {
      id: null,
      name: this.form.name,
      address: this.convertAddressToString()
    }

    if (this.clinicCreateForm.valid) {
      this.clinicService.create(clinic).subscribe(
        (response) => {
          console.log('created..')
         
        },
        (error) => { console.log(error); });
    } else {
      console.log('not valid')
      this.errorMessage = 'Please enter valid data';
    }

  }
  resetError() {
    this.errorMessage = null;
  }
  convertAddressToString(): string {
    let address: string = ""
    address = address + "address " + this.form.clinicaddressvalue + ",";
    address = address + "country " + this.form.clinicaddresscountry + ",";
    if (this.form.clinicaddressstate)
      address = address + "state " + this.form.clinicaddressstate + ",";
    if (this.form.clinicaddressprovince)
      address = address + "province " + this.form.clinicaddressprovince + ",";
    address = address + "zipcode " + this.form.clinicaddresszipcode;
    return address
  }
}
