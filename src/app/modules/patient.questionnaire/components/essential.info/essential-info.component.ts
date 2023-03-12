import { Component, OnInit } from '@angular/core';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import * as moment from 'moment';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import { Patient } from 'src/app/models/patient/patient.model';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  calendarDate = new Date();
  insuranceValidator: ValidatorContainer = new ValidatorContainer();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      this.pateintBasicInfo = pateint.basicInfo;
      console.log(JSON.stringify(this.pateintBasicInfo))
    }

    this.pateintModelRequesterService.currentValue.subscribe(msg => {
      if (msg === 'basic') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.pateintBasicInfo))
      }
    });
  }
}
