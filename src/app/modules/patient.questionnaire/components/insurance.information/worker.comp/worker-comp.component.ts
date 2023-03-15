import { Component, OnInit } from '@angular/core';
import { WrokerComp } from 'src/app/models/questionnaire/Insurance/worker.comp';
import requiredFields from '../../../service/_patient.require.fields.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {
  model : WrokerComp = new WrokerComp();
  constructor() { }

  ngOnInit(): void {
  }

  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
}
