import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { PhysicalTherapy } from 'src/app/models/questionnaire/medical/physical.therapy';
import { RecommendationDoctor } from 'src/app/models/questionnaire/medical/recommendation.doctor';
import { RecommendationEntity } from 'src/app/models/questionnaire/medical/recommendation.entity';
import { MedicalInfoRequired } from 'src/app/models/validation/medical.info.required';
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
  @Input() requiredFields: MedicalInfoRequired;
  constructor() { }

  referringDoctorQChange(val: string) {
    this.isReferringDoctor = val;

    if (val === 'yes') {
      this.medicalQuestionnaireInfo.isDoctorRecommended = true
      this.medicalQuestionnaireInfo.recommendationEntity = undefined;
      this.medicalQuestionnaireInfo.recommendationDoctor = new RecommendationDoctor();
    } if (val === 'no') {
      this.medicalQuestionnaireInfo.isDoctorRecommended = false
      this.medicalQuestionnaireInfo.recommendationDoctor = undefined;
      this.medicalQuestionnaireInfo.recommendationEntity = new RecommendationEntity();
    }
  }
  physicalTherapyQChange(val: string) {
    this.isphysicalTherapy = val;

    if (val === 'yes') {
      this.medicalQuestionnaireInfo.physicalTherapyReceiving = true
      this.medicalQuestionnaireInfo.physicalTherapy = new PhysicalTherapy;
    } if (val === 'no') {
      this.medicalQuestionnaireInfo.physicalTherapyReceiving = false;
      this.medicalQuestionnaireInfo.physicalTherapy = undefined;
    }
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
        pateint.medicalQuestionnaireInfo.isDoctorRecommended ? this.isReferringDoctor = 'yes' : this.isReferringDoctor = 'no';
        pateint.medicalQuestionnaireInfo.physicalTherapyReceiving ? this.isphysicalTherapy = 'yes' : this.isphysicalTherapy = 'no';
        pateint.medicalQuestionnaireInfo.familyResultSubmission ? this.isfamilyResultSubmission = 'yes' : this.isfamilyResultSubmission = 'no';
      } else {
        this.medicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
      }
    } else {
      this.medicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
    }
  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.requiredFields)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
      })
    return field;
  }
}
