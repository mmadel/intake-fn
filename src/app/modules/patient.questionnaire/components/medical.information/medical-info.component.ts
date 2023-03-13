import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.css']
})
export class MedicalInfoComponent implements OnInit {
  isReferringDoctor: string = '';
  isphysicalTherapy: string = '';
  medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  referringDoctorQChange(val: string) {
    this.isReferringDoctor = val;
    val === 'yes' ? this.medicalQuestionnaireInfo.doctorRecommendation = true : this.medicalQuestionnaireInfo.doctorRecommendation = false;
  }
  physicalTherapyQChange(val: string) {
    this.isphysicalTherapy = val;
    val === 'yes' ? this.medicalQuestionnaireInfo.physicalTherapyReceiving =true : this.medicalQuestionnaireInfo.physicalTherapyReceiving = false;
  }
  resultsfamilyQChange(val: string) {
    val === 'yes' ? this.medicalQuestionnaireInfo.familyResultSubmission = true : this.medicalQuestionnaireInfo.familyResultSubmission = false;
  }
  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.medicalQuestionnaireInfo !== undefined)
        this.medicalQuestionnaireInfo = pateint.medicalQuestionnaireInfo;
    }

    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'medical') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.medicalQuestionnaireInfo))
      }
    });
  }

}
