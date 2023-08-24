import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/models/patient/address.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { AddressInfoRequired } from 'src/app/models/validation/address.info.required';
import { LocalService } from 'src/app/modules/common';
@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.css']
})
export class AddressInformationComponent implements OnInit {
  pateintAddressInfo: Address;
  @Input() requiredFields: AddressInfoRequired;
  constructor(private localService:LocalService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.addressInfo !== undefined)
        this.pateintAddressInfo = pateint.addressInfo;
      else
        this.pateintAddressInfo = new Address();
    } else {
      this.pateintAddressInfo = new Address();
    }

  }

}
