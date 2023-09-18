import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Address } from 'src/app/models/patient/address.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import { AddressInfoRequired } from 'src/app/models/validation/address.info.required';
import { InsurnaceCompInfoRequired } from 'src/app/models/validation/insurnace.comp.info.required';
import { LocalService } from 'src/app/modules/common';
import { PatientInsuranceCompensationNoFault } from '../../../models/intake/Insurance/patient.insurance.compensation.no.fault';
import { PatientStoreService } from '../../../service/store/patient-store.service';

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {
  model: WrokerComp
  patientInsuranceCompensationNoFault?: PatientInsuranceCompensationNoFault;
  requiredFields: AddressInfoRequired;
  @Input() insurnaceCompInfoRequired: InsurnaceCompInfoRequired;
  constructor(private patientStoreService: PatientStoreService) { }

  ngOnInit(): void {
    if (this.patientStoreService.patientCommercialInsurance === undefined) {
      this.patientInsuranceCompensationNoFault = {
        address : new Address()
      }

    } else {
      this.patientInsuranceCompensationNoFault = this.patientStoreService.patientInsuranceCompensationNoFault;
    }
    this.requiredFields = {
      id: null,
      type: true,
      first: true,
      second: true,
      country: true,
      zipCode: true
    }
  }


  accidentDate() {
    this.model.accidentDate = Number(moment(this.model.accidentDate_date).format("x"))
  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.insurnaceCompInfoRequired)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
      })
    return field;
  }
}
