import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/models/patient/address.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
import { InsurnacecommerialInfoRequired } from 'src/app/models/validation/insurnace.commerial.info.required';
import { InsurnaceCompInfoRequired } from 'src/app/models/validation/insurnace.comp.info.required';
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
  @Input() insurnaceCompInfoRequired:InsurnaceCompInfoRequired;
  @Input() insurnacecommerialInfoRequired:InsurnacecommerialInfoRequired
  insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo;
  constructor() { }

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
    
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
    if (val === 'yes') {
      
      this.insuranceQuestionnaireInfo.isCompNoFault = true;
      this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = new WrokerComp();
      this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault.workerCompAddress = new Address();
      this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = undefined;

    }

    if (val === 'no') {
      this.insuranceQuestionnaireInfo.isCompNoFault = false;
      this.insuranceQuestionnaireInfo.insuranceWorkerCommercial = new WrokerNotComp();
      this.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = undefined

    }

  }
}
