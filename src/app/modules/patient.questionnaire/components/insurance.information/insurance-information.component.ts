import { Component, OnInit } from '@angular/core';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';

@Component({
  selector: 'app-insurance-information',
  templateUrl: './insurance-information.component.html',
  styleUrls: ['./insurance-information.component.css']
})
export class InsuranceInformationComponent implements OnInit {
  isWorkerCompNoFault: string = '';
  accidentType: string = '';
  model: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'insurance') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.model))
      }
    });
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
  }
  relatedInjuryAutoAccidentChange(val: string) {
    this.accidentType = val;

  }
}
