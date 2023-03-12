import { Component, OnInit } from '@angular/core';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import * as moment from 'moment';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  insuranceValidator: ValidatorContainer = new ValidatorContainer();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentValue.subscribe(msg => {
      if (msg === 'basic') {
        console.log('model requested..')
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.pateintBasicInfo))
      }
    });
  }

  validate() {
    var validator: PatientEssentialValidator = new PatientEssentialValidator();
    this.pateintBasicInfo.birthDate = Number(moment(this.pateintBasicInfo.birthDate_date).format("x"));

    this.pateintBasicInfo.ideffective_from = Number(moment(this.pateintBasicInfo.id_effective_from_date).format("x"))
    this.pateintBasicInfo.ideffective_to = Number(moment(this.pateintBasicInfo.id_effective_to_date).format("x"))
    validator.setModel(this.pateintBasicInfo);
    this.insuranceValidator = validator.validate();
    console.log(JSON.stringify(this.insuranceValidator))
  }
}
