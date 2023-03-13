import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Address } from 'src/app/models/patient/address.info.model';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { PatientAddressValidator } from 'src/app/validators/patient.validator/patient.address.validator';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { ValidatorContainer } from 'src/app/validators/ValidatorContainer';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';


@Component({
  selector: 'app-questionnaire-add',
  templateUrl: './questionnaire-add.component.html',
  styleUrls: ['./questionnaire-add.component.css']
})
export class QuestionnaireAddComponent implements OnInit {

  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Essential" },
    { "id": 2, "name": "Address" },
    { "id": 3, "name": "Medicial" },
    { "id": 4, "name": "Insurance" },
  ];

  counter: number = 1;
  progressValue: number = 0;
  windowScrolled: boolean = true;
  validator: ValidatorContainer = new ValidatorContainer();
  patientEssentialInfo: Basic = new Basic();
  patientAddressInfo: Address = new Address();
  modelName: string = '';
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentModel.subscribe(model => {
      if (model !== '') {
        if (this.modelName === 'basic') {
          this.patientEssentialInfo = JSON.parse(model);
          var atientEssentialValidator: PatientEssentialValidator = new PatientEssentialValidator();
          this.patientEssentialInfo.birthDate = Number(moment(this.patientEssentialInfo.birthDate_date).format("x"));

          this.patientEssentialInfo.ideffective_from = Number(moment(this.patientEssentialInfo.id_effective_from_date).format("x"))
          this.patientEssentialInfo.ideffective_to = Number(moment(this.patientEssentialInfo.id_effective_to_date).format("x"))
          atientEssentialValidator.setModel(this.patientEssentialInfo);
          this.validator = atientEssentialValidator.validate();
        }
        if (this.modelName === 'address') {
          this.patientAddressInfo = JSON.parse(model);
          var patientAddressValidator: PatientAddressValidator = new PatientAddressValidator();
          patientAddressValidator.setModel(this.patientAddressInfo);
          this.validator = patientAddressValidator.validate();
          console.log(JSON.stringify(this.validator))
        }
      }
    });

  }

  next(patientModel: string) {
    this.modelName = patientModel;
    this.pateintModelRequesterService.requestPateintModel(patientModel);
    if (this.validator.isValid) {
      this.cachePatient();
      this.calculatePercentage(this.counter, 'next')
      this.counter++;
      ;
    } else {
      (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {

          window.scrollTo(0, 0);
        }
      })();
    }
  }
  back() {
    this.pateintModelRequesterService.backPateintModel(localStorage.getItem('patient') || '{}');
    this.counter--;
    this.calculatePercentage(this.counter, 'back');

  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }

  cachePatient() {
    localStorage.removeItem('patient');
    var patient: Patient = new Patient();
    patient = JSON.parse(localStorage.getItem('patient') || '{}');
    patient.basicInfo = this.patientEssentialInfo;
    patient.addressInfo = this.patientAddressInfo;
    localStorage.setItem('patient', JSON.stringify(patient));
  }
}
