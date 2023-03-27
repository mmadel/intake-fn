import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicareCoverage } from 'src/app/models/questionnaire/Insurance/medicare.coverage';
import { PatientRelationship } from 'src/app/models/questionnaire/Insurance/patient.relationship';
import { SecondaryInsurance } from 'src/app/models/questionnaire/Insurance/secondary.Insurance';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
import requiredFields from '../../../service/_patient.require.fields.service';

@Component({
  selector: 'app-worker-not-comp',
  templateUrl: './worker-not-comp.component.html',
  styleUrls: ['./worker-not-comp.component.css']
})
export class WorkerNotCompComponent implements OnInit {
  model: WrokerNotComp
  isSecondaryInsurance: string;
  isMedicareCoverage: string;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.insuranceQuestionnaireInfo !== undefined && pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial !== undefined) {
        this.model = pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial;
        
        pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial.isSecondaryInsurance ? this.isSecondaryInsurance = 'yes' :
          this.isSecondaryInsurance = 'no'

        pateint.insuranceQuestionnaireInfo.insuranceWorkerCommercial.isMedicareCoverage ? this.isMedicareCoverage = 'yes' :
          this.isMedicareCoverage = 'no'
      } else {
        this.model = new WrokerNotComp();
      }
    } else {
      this.model = new WrokerNotComp();
    }
  }

  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
  isSecondaryInsuranceChange(val: string) {
    this.isSecondaryInsurance = val;
    if (val === 'yes') {
      this.model.isSecondaryInsurance = true
      this.model.secondaryInsuranceDTO = new SecondaryInsurance();
    }
    if (val === 'no') {
      this.model.isSecondaryInsurance = false
      this.model.secondaryInsuranceDTO = undefined;
      this.model.isMedicareCoverage = undefined
      this.model.medicareCoverageDTO = undefined;
    }

  }
  isMedicareCoverageChange(val: string) {
    this.isMedicareCoverage = val;
    if (val === 'yes') {
      this.model.isMedicareCoverage = true
      this.model.medicareCoverageDTO = new MedicareCoverage()
    }
    if (val === 'no') {
      this.model.isMedicareCoverage = false
      this.model.medicareCoverageDTO = undefined;
    }
  }
  isPatientRelationshipDTOChange() {
    if (this.model.relationship !== 'Self') {
      this.model.patientRelationshipDTO = new PatientRelationship();
    } else {
      this.model.patientRelationshipDTO = undefined
    }
  }
}
