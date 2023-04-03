import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patientcache } from 'src/app/caching/patient.caching';
import { Patient } from 'src/app/models/patient/patient.model';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { PatientRequiredFieldsService } from 'src/app/modules/patient.admin/services/patient.required.fields.service';
import { PateintFilesValidator } from 'src/app/validators/patient.files.validator';
import { PatientAddressValidator } from 'src/app/validators/patient.validator/patient.address.validator';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { PatientInsuranceQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.insurance.questionnaire.validator';
import { MdicalHistoryValidator } from 'src/app/validators/patient.validator/patient.medical.history.validator';
import { PatientMedicalQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.medical.questionnaire.validator';
import { PatientValidator } from 'src/app/validators/patient.validator/patient.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { PatientService } from '../../service/patient.service';
import { AddressInformationComponent } from '../address.information/address-information.component';
import { EssentialInfoComponent } from '../essential.info/essential-info.component';
import { InsuranceInformationComponent } from '../insurance.information/insurance-information.component';
import { MedicalHistoryInformationComponent } from '../medical.history.information/medical-history-information.component';
import { MedicalInfoComponent } from '../medical.information/medical-info.component';
import { UploadPhotoComponent } from '../upload.photos/upload-photo.component';


@Component({
  selector: 'app-questionnaire-add',
  templateUrl: './questionnaire-add.component.html',
  styleUrls: ['./questionnaire-add.component.css']
})
export class QuestionnaireAddComponent implements OnInit {
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Basic Information" },
    { "id": 2, "name": "Address Information" },
    { "id": 3, "name": "Medicial Information" },
    { "id": 4, "name": "Medicial History Information" },
    { "id": 5, "name": "Insurance Information" },
    { "id": 6, "name": "Upload Photos" },
    { "id": 7, "name": "Aggreements" },

  ];

  counter: number = 1;
  progressValue: number = 0;
  windowScrolled: boolean = true;
  validator: ValidatorContainer;
  patientValidator: PatientValidator;
  modelName: string = '';
  patient: Patient = new Patient();
  obj: any;
  patientFields: PatientRequiredFields;
  @ViewChild(EssentialInfoComponent) essentialInfoComponent: EssentialInfoComponent;
  @ViewChild(AddressInformationComponent) addressInformationComponent: AddressInformationComponent;
  @ViewChild(MedicalInfoComponent) medicalInfoComponent: MedicalInfoComponent;
  @ViewChild(MedicalHistoryInformationComponent) medicalHistoryInformationComponent: MedicalHistoryInformationComponent;
  @ViewChild(InsuranceInformationComponent) insuranceInformationComponent: InsuranceInformationComponent;
  @ViewChild(UploadPhotoComponent) uploadPhotoComponent: UploadPhotoComponent;
  constructor(
    private patientService: PatientService,
    private patientRequiredFieldsService: PatientRequiredFieldsService,
    private router: Router) { }

  ngOnInit(): void {
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      this.patientFields = <PatientRequiredFields>patientFields;
    })
  }


  next(patientModel: string) {
    this.validator = new ValidatorContainer();
    if (patientModel === 'basic') {
      this.patientValidator = new PatientEssentialValidator(this.patientFields.basicInfo
        , this.essentialInfoComponent.pateintBasicInfo);
    }
    if (patientModel === 'address') {
      this.patientValidator = new PatientAddressValidator(this.patientFields.addressInfoRequired,
        this.addressInformationComponent.pateintAddressInfo);
    }
    if (patientModel === 'medical') {
      this.patientValidator = new PatientMedicalQuestionnaireValidator(this.medicalInfoComponent.medicalQuestionnaireInfo,
        this.patientFields.medicalInfoRequired);
    }
    if (patientModel === 'medical-history') {
      this.patientValidator = new MdicalHistoryValidator(this.medicalHistoryInformationComponent.model,
        this.patientFields.medicalHistoryInfoRequired)
    }
    if (patientModel === 'insurance') {
      if (this.insuranceInformationComponent.insuranceQuestionnaireInfo.isCompNoFault
        && this.insuranceInformationComponent.workerCompComponent !== undefined)
        this.insuranceInformationComponent.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = this.insuranceInformationComponent.workerCompComponent.model
      if (!this.insuranceInformationComponent.insuranceQuestionnaireInfo.isCompNoFault
        && this.insuranceInformationComponent.workerNotCompComponent !== undefined)
        this.insuranceInformationComponent.insuranceQuestionnaireInfo.insuranceWorkerCommercial = this.insuranceInformationComponent.workerNotCompComponent.model
      this.patientValidator = new PatientInsuranceQuestionnaireValidator(
        this.insuranceInformationComponent.insuranceQuestionnaireInfo
        , this.patientFields.insurnaceCompInfoRequired
        , this.patientFields.insurnacecommerialInfoRequired)
    }
    if (patientModel === 'upload') {
      this.patientValidator = new PateintFilesValidator(this.uploadPhotoComponent.imageFormData);
    }
    this.validator = this.patientValidator.validate();
    if (this.validator.isValid) {
      this.fillModel()
      this.proceedToNextStep(patientModel);
    } else {
      this.scrollUp();
    }
  }
  proceedToNextStep(modelName: string) {
    Patientcache.cache(modelName, this.patient)
    this.calculatePercentage(this.counter, 'next')
    this.counter++;
    this.scrollUp();
  }
  back() {
    this.counter--;
    this.calculatePercentage(this.counter, 'back');
    this.validator = new ValidatorContainer();
  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }

  submit() {
    var pateint: string = localStorage.getItem('patient') || '';
    this.patientService.createPatient(pateint).subscribe(
      (response) => {
        console.log('this.patient.files ' + this.patient.files)
        this.patientService.upload(this.patient.files, <number>response.body).subscribe(
          (response) => {
            console.log('uploaded..')
          },
          (error) => { console.log(error); });
        localStorage.removeItem('patient');
        this.router.navigate(['/questionnaire/submitted']);
      },
      (error) => { console.log(error); });
  }
  fillModel() {
    this.patient.basicInfo = this.essentialInfoComponent?.pateintBasicInfo;
    this.patient.addressInfo = this.addressInformationComponent?.pateintAddressInfo
    this.patient.medicalQuestionnaireInfo = this.medicalInfoComponent?.medicalQuestionnaireInfo;
    this.patient.medicalHistoryInformation = this.medicalHistoryInformationComponent?.model;
    this.patient.files = this.uploadPhotoComponent ? this.uploadPhotoComponent.imageFormData : this.patient.files;
    this.fillInsuranceInformationModel()

  }

  fillInsuranceInformationModel() {
    this.patient.insuranceQuestionnaireInfo.isCompNoFault = this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault;
    if (this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault)
      this.patient.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = this.insuranceInformationComponent?.workerCompComponent.model
    if (!this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault)
      this.patient.insuranceQuestionnaireInfo.insuranceWorkerCommercial = this.insuranceInformationComponent?.workerNotCompComponent.model
  }
}
