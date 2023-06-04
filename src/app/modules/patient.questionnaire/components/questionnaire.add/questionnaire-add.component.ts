import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/patient/patient.model';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { LocalService } from 'src/app/modules/common';
import { PatientRequiredFieldsService } from 'src/app/modules/patient.admin/services/patient.required.fields.service';
import { PateintFilesValidator } from 'src/app/validators/patient.files.validator';
import { PatientAddressValidator } from 'src/app/validators/patient.validator/patient.address.validator';
import { PatientAggreementsValidator } from 'src/app/validators/patient.validator/patient.aggreements.validator';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { PatientInsuranceQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.insurance.questionnaire.validator';
import { MdicalHistoryValidator } from 'src/app/validators/patient.validator/patient.medical.history.validator';
import { PatientMedicalQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.medical.questionnaire.validator';
import { PatientValidator } from 'src/app/validators/patient.validator/patient.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { PatientService } from '../../service/patient.service';
import { AddressInformationComponent } from '../address.information/address-information.component';
import { AggreementsComponent } from '../aggreements/aggreements.component';
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
  clinicId: number;
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Basic Information" },
    { "id": 2, "name": "Address Information" },
    { "id": 3, "name": "Medical Information" },
    { "id": 4, "name": "Medical History Information" },
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
  @ViewChild(AggreementsComponent) aggreementsComponent: AggreementsComponent;
  constructor(
    private patientService: PatientService,
    private patientRequiredFieldsService: PatientRequiredFieldsService,
    private router: Router,
    private localService: LocalService,
    private toastr:ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.localService.removeData('patient')
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      this.patientFields = <PatientRequiredFields>patientFields;
      this.clinicId = Number(this.route.snapshot.queryParamMap.get('clinicId'));
      if (this.clinicId === 0 || this.clinicId === undefined || this.clinicId === null) {
        this.router.navigate(['/admin/patient/create']);
      } else {
        this.router.navigate([], {
          queryParams: {
            'clinicId': null,
          },
          queryParamsHandling: 'merge'
        })
      }
    })
  }


  next(patientModel: string) {
    this.validator = new ValidatorContainer();
    if (patientModel === 'basic') {
      this.patientValidator = new PatientEssentialValidator(this.patientFields.basicInfo
        , this.essentialInfoComponent.pateintBasicInfo);
      this.essentialInfoComponent.pateintBasicInfo.birthDate = Number(moment(this.essentialInfoComponent?.pateintBasicInfo.birthDate_date).format("x"));
      this.essentialInfoComponent.pateintBasicInfo.idEffectiveFrom = Number(moment(this.essentialInfoComponent?.pateintBasicInfo.id_effective_from_date).format("x"))
      this.essentialInfoComponent.pateintBasicInfo.idEffectiveTo = Number(moment(this.essentialInfoComponent?.pateintBasicInfo.id_effective_to_date).format("x"))
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
    if (patientModel === 'aggreements') {
      this.patientValidator = new PatientAggreementsValidator(this.aggreementsComponent.model);
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
    this.cachePatient(modelName, this.patient)
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
    var pateint: Patient = JSON.parse(this.localService.getData('patient') || '');
    pateint.clinicId = this.clinicId
    this.patientService.createPatient(JSON.stringify(pateint)).subscribe(
      (response) => {
        console.log('this.patient.files ' + this.patient.files)
        this.patientService.upload(this.patient.files, <number>response.body).subscribe(
          (response) => {
            console.log('uploaded..')
          },
          (error) => { 
            this.scrollUp();
            this.toastr.error(error.error.message, 'Error In Upload Images');
          });
        this.localService.removeData('patient');
        this.router.navigate(['/questionnaire/submitted']);
      },
      (error) => { 
        console.log(JSON.stringify(error))
        this.toastr.error(error.error.message, 'Error In Creation'); 
        this.scrollUp();
      });
  }
  fillModel() {
    this.patient.basicInfo = this.essentialInfoComponent?.pateintBasicInfo;

    this.patient.addressInfo = this.addressInformationComponent?.pateintAddressInfo
    this.patient.medicalQuestionnaireInfo = this.medicalInfoComponent?.medicalQuestionnaireInfo;
    this.patient.medicalHistoryInformation = this.medicalHistoryInformationComponent?.model;
    this.patient.agreements = this.aggreementsComponent?.model;
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

  cachePatient(modelName: string, pateintHolder: Patient) {
    var patient: Patient = new Patient();
    patient = JSON.parse(this.localService.getData('patient') || '{}');
    if (modelName === 'basic')
      patient.basicInfo = pateintHolder.basicInfo;
    if (modelName === 'address')
      patient.addressInfo = pateintHolder.addressInfo;
    if (modelName === 'medical')
      patient.medicalQuestionnaireInfo = pateintHolder.medicalQuestionnaireInfo
    if (modelName === 'insurance')
      patient.insuranceQuestionnaireInfo = pateintHolder.insuranceQuestionnaireInfo;
    if (modelName === 'medical-history')
      patient.medicalHistoryInformation = pateintHolder.medicalHistoryInformation;
    if (modelName === 'aggreements')
      patient.agreements = pateintHolder.agreements;

    this.localService.saveData('patient', JSON.stringify(patient));
  }
}
