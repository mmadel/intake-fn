import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Address } from 'src/app/models/patient/address.info.model';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import { AddressInfoRequired } from 'src/app/models/validation/address.info.required';
import { InsurnaceCompInfoRequired } from 'src/app/models/validation/insurnace.comp.info.required';
import { PatientInsuranceQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.insurance.questionnaire.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
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
    if (this.patientStoreService.patientInsuranceCompensationNoFault === undefined) {
      this.patientInsuranceCompensationNoFault = {
        address: new Address(),
        injuryType:'',
        workerStatus:'',
        caseStatus:''
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
    this.patientInsuranceCompensationNoFault!.accidentDate = Number(moment(this.patientInsuranceCompensationNoFault!.accidentDate_date).format("x"))
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
  public validate(): ValidatorContainer {
    var patientValidator = new PatientInsuranceQuestionnaireValidator()
    patientValidator.setInsurnaceCompInfoRequired(this.insurnaceCompInfoRequired)
    patientValidator.setComnsetationModel(this.patientInsuranceCompensationNoFault)
    return patientValidator.validate();
  }
  formatDate() {
    this.patientInsuranceCompensationNoFault!.accidentDate = Number(moment(this.patientInsuranceCompensationNoFault?.accidentDate_date).format("x"));
  }
}
