import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/patient/address.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import requiredFields from '../../service/_patient.require.fields.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.css']
})
export class AddressInformationComponent implements OnInit {
  pateintAddressInfo: Address;
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      console.log('caching')
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      console.log(JSON.stringify(pateint.addressInfo))
      if (pateint.addressInfo !== undefined)
        this.pateintAddressInfo = pateint.addressInfo;
      else
        this.pateintAddressInfo = new Address();
    }
    console.log(this.pateintAddressInfo);
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'address') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.pateintAddressInfo))
      }
    });
  }
  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }

}
