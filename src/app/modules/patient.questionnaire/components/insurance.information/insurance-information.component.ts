import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
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
      if (pateint.insuranceQuestionnaireInfo !== undefined) {
        this.insuranceQuestionnaireInfo = pateint.insuranceQuestionnaireInfo;
        this.insuranceQuestionnaireInfo.isCompNoFault === true ? this.isWorkerCompNoFault = 'yes' : this.isWorkerCompNoFault = 'no'
        if (pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault !== undefined) {
          this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault
        }
        if (pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial !== undefined) {
          this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial;
        }
      } else {
        this.insuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
      }

    } else {
      this.insuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    }
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'insurance') {
        console.log(this.workerNotCompComponent)
        if (this.isWorkerCompNoFault === 'yes' && this.workerCompComponent !== undefined) {
          this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = this.workerCompComponent.model;
        }
        if (this.isWorkerCompNoFault === 'no' && this.workerNotCompComponent !== undefined) {
          this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = this.workerNotCompComponent.model;
        }
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.insuranceQuestionnaireInfo))
      }
    });
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
    if (val === 'yes') {
      this.insuranceQuestionnaireInfo.isCompNoFault = true;
      this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = new WrokerComp();
      this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = undefined;

    }

    if (val === 'no') {
      this.insuranceQuestionnaireInfo.isCompNoFault = false;
      this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = new WrokerNotComp();
      this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = undefined

    }

  }
}
