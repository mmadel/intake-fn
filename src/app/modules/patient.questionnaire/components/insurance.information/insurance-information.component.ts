import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import { WorkerCompComponent } from './worker.comp/worker-comp.component';
import { WorkerNotCompComponent } from './worker.not.comp/worker-not-comp.component';

@Component({
  selector: 'app-insurance-information',
  templateUrl: './insurance-information.component.html',
  styleUrls: ['./insurance-information.component.css']
})
export class InsuranceInformationComponent implements OnInit {
  isWorkerCompNoFault: string = '';
  accidentType: string = '';
  @ViewChild(WorkerCompComponent) workerCompComponent: WorkerCompComponent;
  @ViewChild(WorkerNotCompComponent) workerNotCompComponent: WorkerNotCompComponent;

  insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo;
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.insuranceQuestionnaireInfo !== undefined)
        this.insuranceQuestionnaireInfo = pateint.insuranceQuestionnaireInfo;
      else
        this.insuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    } else {
      this.insuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    }
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'insurance') {
        if (this.isWorkerCompNoFault === 'yes')
          this.insuranceQuestionnaireInfo.wrokerCompModel = this.workerCompComponent.model;
        if (this.isWorkerCompNoFault === 'no')
          this.insuranceQuestionnaireInfo.WrokerNotCompModel = this.workerNotCompComponent.model;

        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.insuranceQuestionnaireInfo))
      }
    });
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
    if (val === 'yes')
      this.insuranceQuestionnaireInfo.isWrokerComp = true;
    if (val === 'no')
      this.insuranceQuestionnaireInfo.isWrokerComp = false;
  }
}
