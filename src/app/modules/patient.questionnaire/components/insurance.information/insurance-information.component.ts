import { Component, OnInit, ViewChild } from '@angular/core';
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

  model: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'insurance') {
        if (this.isWorkerCompNoFault === 'yes')
          this.model.wrokerCompModel = this.workerCompComponent.model;
        if (this.isWorkerCompNoFault === 'no')
          this.model.WrokerNotCompModel = this.workerNotCompComponent.model;
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.model))
      }
    });
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
    if (val === 'yes')
      this.model.isWrokerComp = true;
    if (val === 'no')
      this.model.isWrokerComp = false;
  }
}
