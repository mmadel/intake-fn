import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { InsurnacecommerialInfoRequired } from 'src/app/models/validation/insurnace.commerial.info.required';
import { InsurnaceCompInfoRequired } from 'src/app/models/validation/insurnace.comp.info.required';
import { PatientInsurance } from '../../models/intake/Insurance/patient.insurance';
import { WorkerCompComponent } from './worker.comp/worker-comp.component';
import { WorkerNotCompComponent } from './worker.not.comp/worker-not-comp.component';

@Component({
  selector: 'app-insurance-information',
  templateUrl: './insurance-information.component.html',
  styleUrls: ['./insurance-information.component.css']
})
export class InsuranceInformationComponent implements OnInit {
  isWorkerCompNoFault: string = '';
  @ViewChild(WorkerCompComponent) workerCompComponent: WorkerCompComponent;
  @ViewChild(WorkerNotCompComponent) workerNotCompComponent: WorkerNotCompComponent;
  @Input() insurnaceCompInfoRequired: InsurnaceCompInfoRequired;
  @Input() insurnacecommerialInfoRequired: InsurnacecommerialInfoRequired
  insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo;
  patientInsurance?: PatientInsurance = {};
  constructor() { }

  ngOnInit(): void {


  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
    if (val === 'yes') {
      this.patientInsurance!.patientInsuranceCompensationNoFault = {}
      this.patientInsurance!.patientCommercialInsurance = undefined;
    }
    if (val === 'no') {
      this.patientInsurance!.patientCommercialInsurance = {}
      this.patientInsurance!.patientInsuranceCompensationNoFault = undefined;

    }
  }
}
