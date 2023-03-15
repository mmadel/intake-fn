import { Component, OnInit } from '@angular/core';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import requiredFields from '../../service/_patient.require.fields.service';
import { Patient } from 'src/app/models/patient/patient.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('patient'))
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.basicInfo !== undefined) {
        this.pateintBasicInfo = pateint.basicInfo;
      } else {
        this.pateintBasicInfo = new Basic();
      }
    } else {
      this.pateintBasicInfo = new Basic();
    }

    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'basic') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.pateintBasicInfo))
      }
    });
  }
  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
}
