import { Component, OnInit } from '@angular/core';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import requiredFields from '../../service/_patient.require.fields.service';
import { Patient } from 'src/app/models/patient/patient.model';
import * as _ from 'lodash';
import { PatientRequiredFieldsService } from 'src/app/modules/patient.admin/services/patient.required.fields.service';
import { BasicInfo } from 'src/app/models/validation/basic.info';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  basicInfo: BasicInfo;
  constructor(private pateintModelRequesterService: PateintModelRequesterService,
    private patientRequiredFieldsService: PatientRequiredFieldsService) { }

  ngOnInit(): void {
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
    this.patientRequiredFieldsService.retrieveRequiredBasisInfo().subscribe(patientFields => {
      this.basicInfo = <BasicInfo>patientFields;
    });
  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.basicInfo)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
        console.log(`${key}: ${value}`)
      })
    return field;
  }
}
