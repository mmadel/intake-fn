import { Component, Input, OnInit } from '@angular/core';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { MedicalInfoRequired } from 'src/app/models/validation/medical.info.required';
import entityValues from 'src/app/modules/patient.admin/components/reports/_entity.values';
import { PatientMedicalQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.medical.questionnaire.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { PatientMedical } from '../../models/intake/medical/patient.medical';
import { PatientSource } from '../../models/intake/source/patient.source';
import { PatientStoreService } from '../../service/store/patient-store.service';
@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.css']
})
export class MedicalInfoComponent implements OnInit {
  isReferringDoctor: string = '';
  isfamilyResultSubmission: string = '';
  medicalQuestionnaireInfo: MedicalQuestionnaireInfo;
  patientMedical?: PatientMedical;
  patientSource?: PatientSource = {};
  @Input() requiredFields: MedicalInfoRequired;
  entityValues = entityValues;
  constructor(private patientStoreService: PatientStoreService) { }

  referringDoctorQChange(val: string) {
    this.isReferringDoctor = val;
    val === 'yes' ? this.patientSource!.doctorSource = {} : this.patientSource!.entitySource = {};
    if (val === 'yes') {
      this.patientSource!.doctorSource = {}
      this.patientSource!.entitySource = undefined;
    } else {
      this.patientSource!.entitySource = {}
      this.patientSource!.doctorSource = undefined;
    }
  }
  physicalTherapyQChange(val: string) {
    if (val === 'yes') {
      this.patientMedical!.patientPhysicalTherapy = {};
    } if (val === 'no') {
      this.patientMedical!.patientPhysicalTherapy = undefined;
    }
  }
  resultsfamilyQChange(val: string) {
    val === 'yes' ? this.patientMedical!.familyResultSubmission = true : this.patientMedical!.familyResultSubmission = false;
  }
  ngOnInit(): void {
    if (this.patientStoreService.patientMedical === undefined) {
      this.patientMedical = {
        patientMedicalHistory: {},
        patientPhysicalTherapy: {}
      }
    } else {
      this.patientMedical = this.patientStoreService.patientMedical;
      this.patientSource = this.patientStoreService.patientSource;
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
  public validate(): ValidatorContainer {
    var patientValidator = new PatientMedicalQuestionnaireValidator(this.patientMedical || {}, this.patientSource || {},
      this.requiredFields);
    return patientValidator.validate();
  }
}
