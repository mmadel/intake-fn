import { Component, OnInit } from '@angular/core';
import { WrokerNotComp } from 'src/app/models/questionnaire/Insurance/worker.not.comp';
import requiredFields from '../../../service/_patient.require.fields.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-worker-not-comp',
  templateUrl: './worker-not-comp.component.html',
  styleUrls: ['./worker-not-comp.component.css']
})
export class WorkerNotCompComponent implements OnInit {
  model: WrokerNotComp = new WrokerNotComp();
  isSecondaryInsurance: string;
  isMedicareCoverage: string;
  constructor() { }

  ngOnInit(): void {
  }

  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
  isSecondaryInsuranceChange(val: string) {
    this.isSecondaryInsurance = val;
  }
  isMedicareCoverageChange(val: string) {
    this.isMedicareCoverage = val;
  }
}
