import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { InsurnacecommerialInfoRequired } from 'src/app/models/validation/insurnace.commerial.info.required';
import { InsurnaceCompInfoRequired } from 'src/app/models/validation/insurnace.comp.info.required';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { PatientInsurance } from '../../models/intake/Insurance/patient.insurance';
import { PatientStoreService } from '../../service/store/patient-store.service';
import { WorkerCompComponent } from './worker.comp/worker-comp.component';
import { WorkerNotCompComponent } from './worker.not.comp/worker-not-comp.component';

@Component({
  selector: 'app-insurance-information',
  templateUrl: './insurance-information.component.html',
  styleUrls: ['./insurance-information.component.css']
})
export class InsuranceInformationComponent implements OnInit {
  patientInsuranceType: string | undefined = undefined;
  @ViewChild(WorkerCompComponent) workerCompComponent: WorkerCompComponent;
  @ViewChild(WorkerNotCompComponent) workerNotCompComponent: WorkerNotCompComponent;
  @Input() insurnaceCompInfoRequired: InsurnaceCompInfoRequired;
  @Input() insurnacecommerialInfoRequired: InsurnacecommerialInfoRequired
  insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo;
  patientInsurance?: PatientInsurance = {};
  constructor(private patientStoreService: PatientStoreService) { }

  ngOnInit(): void {
    if (this.patientStoreService.patientInsuranceType)
      this.patientInsuranceType = this.patientStoreService.patientInsuranceType;
  }
  workerCompNoFaultQChange(val: string) {
    if (val === 'yes') {
      this.patientInsurance!.patientInsuranceCompensationNoFault = {}
      this.patientInsurance!.patientCommercialInsurance = undefined;
      this.patientStoreService.patientInsuranceType = 'CompensationNoFault'
      this.patientInsuranceType = 'CompensationNoFault'
    }
    if (val === 'no') {
      this.patientInsurance!.patientCommercialInsurance = {}
      this.patientInsurance!.patientInsuranceCompensationNoFault = undefined;
      this.patientStoreService.patientInsuranceType = 'Commercial';
      this.patientInsuranceType = 'Commercial';

    }
  }
  public validate(): ValidatorContainer {
    console.log('this.workerCompComponent ' + this.workerCompComponent)
    console.log('workerNotCompComponent ' + this.workerNotCompComponent)
    if (this.workerCompComponent)
      return this.workerCompComponent.validate()
    else
      return this.workerNotCompComponent.validate();
  }
  public store() {
    if (this.workerCompComponent)
      this.patientStoreService!.patientInsuranceCompensationNoFault = this.workerCompComponent.patientInsuranceCompensationNoFault;
    if (this.workerNotCompComponent)
      this.patientStoreService!.patientCommercialInsurance = this.workerNotCompComponent.patientCommercialInsurance;

  }
}
