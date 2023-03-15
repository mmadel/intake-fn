import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';
import requiredFields from '../../service/_patient.require.fields.service';
@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.css']
})
export class MedicalInfoComponent implements OnInit {
  isReferringDoctor: string = '';
  isphysicalTherapy: string = '';
  isfamilyResultSubmission: string = '';
  medicalQuestionnaireInfo: MedicalQuestionnaireInfo;
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  referringDoctorQChange(val: string) {
    this.isReferringDoctor = val;
    val === 'yes' ? this.medicalQuestionnaireInfo.doctorRecommendation = true : this.medicalQuestionnaireInfo.doctorRecommendation = false;
  }
  physicalTherapyQChange(val: string) {
    this.isphysicalTherapy = val;
    val === 'yes' ? this.medicalQuestionnaireInfo.physicalTherapyReceiving = true : this.medicalQuestionnaireInfo.physicalTherapyReceiving = false;
  }
  resultsfamilyQChange(val: string) {
    this.isfamilyResultSubmission = val;
    val === 'yes' ? this.medicalQuestionnaireInfo.familyResultSubmission = true : this.medicalQuestionnaireInfo.familyResultSubmission = false;
  }
  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.medicalQuestionnaireInfo !== undefined) {
        this.medicalQuestionnaireInfo = pateint.medicalQuestionnaireInfo;
        pateint.medicalQuestionnaireInfo.doctorRecommendation ? this.isReferringDoctor = 'yes' : this.isReferringDoctor = 'no';
        pateint.medicalQuestionnaireInfo.physicalTherapyReceiving ? this.isphysicalTherapy = 'yes' : this.isphysicalTherapy = 'no';
        pateint.medicalQuestionnaireInfo.familyResultSubmission ? this.isfamilyResultSubmission = 'yes' : this.isfamilyResultSubmission = 'no';
      } else {
        this.medicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
      }

    }

    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'medical') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.medicalQuestionnaireInfo))
      }
    });
  }
  isRequiredField(name: string): boolean {
    var field = _.find(requiredFields, { field: name })
    return field !== undefined ? field.required : false;
  }
}
