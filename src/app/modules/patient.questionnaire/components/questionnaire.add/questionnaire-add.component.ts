import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Patient } from 'src/app/models/patient/patient.model';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { PatientRequiredFieldsService } from 'src/app/modules/patient.admin/services/patient.required.fields.service';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { Patient } from '../../models/intake/patient';
import { PatientSignature } from '../../models/patient/signature.model';
import { PatientService } from '../../service/patient.service';
import { PatientStoreService } from '../../service/store/patient-store.service';
import { AddressInformationComponent } from '../address.information/address-information.component';
import { AggreementsComponent } from '../aggreements/aggreements.component';
import { EssentialInfoComponent } from '../essential.info/essential-info.component';
import { InsuranceInformationComponent } from '../insurance.information/insurance-information.component';
import { MedicalHistoryInformationComponent } from '../medical.history.information/medical-history-information.component';
import { MedicalInfoComponent } from '../medical.information/medical-info.component';
import { PatientsignatureComponent } from '../signature/patientsignature.component';
import { UploadPhotoComponent } from '../upload.photos/upload-photo.component';


@Component({
  selector: 'app-questionnaire-add',
  templateUrl: './questionnaire-add.component.html',
  styleUrls: ['./questionnaire-add.component.css']
})
export class QuestionnaireAddComponent implements OnInit {
  clinicId: number;
  isCreated: boolean = false;
  isClinicIdEmpty: boolean = false;
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Basic Information" },
    { "id": 2, "name": "Address Information" },
    { "id": 3, "name": "Medical Information" },
    { "id": 4, "name": "Medical History Information" },
    { "id": 5, "name": "Insurance Information" },
    { "id": 6, "name": "Upload Photos" },
    { "id": 7, "name": "Aggreements" },
    { "id": 8, "name": "Signature" },

  ];

  counter: number = 1;
  progressValue: number = 0;
  windowScrolled: boolean = true;
  validator: ValidatorContainer;
  modelName: string = '';
  signatureImg: string;
  //patient: Patient = new Patient();
  obj: any;
  patientFields: PatientRequiredFields;
  @ViewChild(EssentialInfoComponent) essentialInfoComponent: EssentialInfoComponent;
  @ViewChild(AddressInformationComponent) addressInformationComponent: AddressInformationComponent;
  @ViewChild(MedicalInfoComponent) medicalInfoComponent: MedicalInfoComponent;
  @ViewChild(MedicalHistoryInformationComponent) medicalHistoryInformationComponent: MedicalHistoryInformationComponent;
  @ViewChild(InsuranceInformationComponent) insuranceInformationComponent: InsuranceInformationComponent;
  @ViewChild(UploadPhotoComponent) uploadPhotoComponent: UploadPhotoComponent;
  @ViewChild(AggreementsComponent) aggreementsComponent: AggreementsComponent;
  @ViewChild(PatientsignatureComponent) patientsignatureComponent: PatientsignatureComponent;
  PatientsignatureComponentTmp: PatientsignatureComponent;
  constructor(
    private patientService: PatientService,
    private patientRequiredFieldsService: PatientRequiredFieldsService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private patientStoreService: PatientStoreService) {
  }
  formFiles: FormData = new FormData();
  ngOnInit(): void {
    // this.localService.removeData('patient')
    this.patientRequiredFieldsService.retrieve().subscribe(patientFields => {
      this.patientFields = <PatientRequiredFields>patientFields;
      this.clinicId = Number(this.route.snapshot.queryParamMap.get('clinicId'));
      if (this.clinicId === 0 || this.clinicId === undefined || this.clinicId === null) {
        //this.router.navigate(['/questionnaire/error']);
        this.isClinicIdEmpty = true;
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
      this.essentialInfoComponent?.formatDate();
      this.validator = this.essentialInfoComponent?.validate();
      if (this.validator.isValid) {
        this.patientStoreService.patientEssentialInformation = this.essentialInfoComponent.patientEssentialInformation;
        this.proceedToNextStep();
      } else {
        this.scrollUp();
      }
    }
    if (patientModel === 'address') {
      this.validator = this.addressInformationComponent?.validate();
      if (this.validator.isValid) {
        this.patientStoreService.patientAddress = this.addressInformationComponent.patientAddress;
        this.proceedToNextStep();
      } else {
        this.scrollUp();
      }
    }
    // if (patientModel === 'medical') {
    //   this.patientValidator = new PatientMedicalQuestionnaireValidator(this.medicalInfoComponent.medicalQuestionnaireInfo,
    //     this.patientFields.medicalInfoRequired);
    // }
    // if (patientModel === 'medical-history') {
    //   this.patientValidator = new MdicalHistoryValidator(this.medicalHistoryInformationComponent.model,
    //     this.patientFields.medicalHistoryInfoRequired)
    // }
    // if (patientModel === 'insurance') {
    //   if (this.insuranceInformationComponent.insuranceQuestionnaireInfo.isCompNoFault
    //     && this.insuranceInformationComponent.workerCompComponent !== undefined)
    //     this.insuranceInformationComponent.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = this.insuranceInformationComponent.workerCompComponent.model
    //   if (!this.insuranceInformationComponent.insuranceQuestionnaireInfo.isCompNoFault
    //     && this.insuranceInformationComponent.workerNotCompComponent !== undefined)
    //     this.insuranceInformationComponent.insuranceQuestionnaireInfo.insuranceWorkerCommercial = this.insuranceInformationComponent.workerNotCompComponent.model
    //   this.patientValidator = new PatientInsuranceQuestionnaireValidator(
    //     this.insuranceInformationComponent.insuranceQuestionnaireInfo
    //     , this.patientFields.insurnaceCompInfoRequired
    //     , this.patientFields.insurnacecommerialInfoRequired)
    // }
    // if (patientModel === 'upload') {
    //   this.patientValidator = new PateintFilesValidator(this.uploadPhotoComponent.imageFormData);
    // }
    // if (patientModel === 'aggreements') {
    //   this.patientValidator = new PatientAggreementsValidator(this.aggreementsComponent.model);
    // }
  }
  proceedToNextStep() {
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
  validateAndUploadsignature(patientId: number) {
    if (this.PatientsignatureComponentTmp?.signatureType === 0) {
      this.PatientsignatureComponentTmp?.draw();
      var model: PatientSignature = this.PatientsignatureComponentTmp?.model;
      model.patientId = patientId;
      this.patientService.uploadPatientSignature(model).subscribe(
        (response) => {
          console.log('uploaded drawed  patient Signature..')
        },
        (error) => {
          this.scrollUp();
          this.toastr.error(error.error.message, 'Error In Upload Images');
        });
    }
    if (this.PatientsignatureComponentTmp?.signatureType === 1) {
      this.PatientsignatureComponentTmp?.generate().then(canvas => {
        var model: PatientSignature = new PatientSignature();
        model.signature = canvas.toDataURL();
        model.patientId = patientId;
        this.patientService.uploadPatientSignature(model).subscribe(
          (response) => {
            console.log('uploaded generated patient Signature..')
          },
          (error) => {
            this.scrollUp();
            this.toastr.error(error.error.message, 'Error In Upload Images');
          });
      });;
    }
  }
  submit() {
    // var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '');
    // pateint.clinicId = this.clinicId
    // this.patientService.createPatient(JSON.stringify(pateint)).subscribe(
    //   (response) => {
    //     this.patientService.upload(this.formFiles, <number>response.body).subscribe(
    //       (response) => {

    //         console.log('uploaded..')
    //       },
    //       (error) => {
    //         this.scrollUp();
    //         this.toastr.error(error.error.message, 'Error In Upload Images');
    //       });
    //     this.validateAndUploadsignature(<number>response.body);
    //     this.localService.removeData('patient');
    //     this.isCreated = true;
    //   },
    //   (error) => {
    //     console.log(JSON.stringify(error))
    //     this.toastr.error(error.error.message, 'Error In Creation');
    //     this.scrollUp();
    //   });

  }
  fillModel() {
    //this.patientStoreService.patientAddress = this.addressInformationComponent?.patientAddress;
    // this.patient.medicalQuestionnaireInfo = this.medicalInfoComponent?.medicalQuestionnaireInfo;
    // this.patient.medicalHistoryInformation = this.medicalHistoryInformationComponent?.model;
    // this.fillInsuranceInformationModel()
    // this.fillModelFiles();
    // this.patient.agreements = this.aggreementsComponent?.model;
    // if (this.patientsignatureComponent !== undefined)
    //   this.PatientsignatureComponentTmp = this.patientsignatureComponent
  }
  fillModelFiles() {
    if (this.essentialInfoComponent) {
      for (let guarantor of this.essentialInfoComponent.imageFormData) {
        this.formFiles.append(guarantor[0], guarantor[1])
      }
    }
    if (this.uploadPhotoComponent) {
      for (let patientFiles of this.uploadPhotoComponent.imageFormData) {
        this.formFiles.append(patientFiles[0], patientFiles[1]);
      }
    }

  }
  fillInsuranceInformationModel() {
    // this.patient.insuranceQuestionnaireInfo.isCompNoFault = this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault;
    // if (this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault)
    //   this.patient.insuranceQuestionnaireInfo.insuranceWorkerCompNoFault = this.insuranceInformationComponent?.workerCompComponent.model
    // if (!this.insuranceInformationComponent?.insuranceQuestionnaireInfo.isCompNoFault)
    //   this.patient.insuranceQuestionnaireInfo.insuranceWorkerCommercial = this.insuranceInformationComponent?.workerNotCompComponent.model
  }
  cachePatient(modelName: string, pateintHolder: Patient) {
    // var patient: Patient = new Patient();
    // patient = JSON.parse(localStorage.getItem('patient') || '{}');
    // if (modelName === 'basic')
    //   patient.basicInfo = pateintHolder.basicInfo;
    // if (modelName === 'address')
    //   patient.addressInfo = pateintHolder.addressInfo;
    // if (modelName === 'medical')
    //   patient.medicalQuestionnaireInfo = pateintHolder.medicalQuestionnaireInfo
    // if (modelName === 'insurance')
    //   patient.insuranceQuestionnaireInfo = pateintHolder.insuranceQuestionnaireInfo;
    // if (modelName === 'medical-history')
    //   patient.medicalHistoryInformation = pateintHolder.medicalHistoryInformation;
    // if (modelName === 'aggreements')
    //   patient.agreements = pateintHolder.agreements;

    //localStorage.setItem('patient', JSON.stringify(patient));
  }
}
