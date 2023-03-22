import { Component, OnInit } from '@angular/core';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import requiredFields from '../../../service/_patient.require.fields.service';
import * as _ from 'lodash';
import { Patient } from 'src/app/models/patient/patient.model';
import { PateintModelRequesterService } from '../../../service/validator/patient/pateint-model-requester.service';

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {
  model: WrokerComp
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.insuranceQuestionnaireInfo !== undefined && pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault !== undefined) {
        this.model = pateint.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault;
      } else {
        this.model = new WrokerComp();;
      }
    } else {
      this.model = new WrokerComp();;
    }
  }

  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
}
