import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Patientcache } from 'src/app/caching/patient.caching';
import { Address } from 'src/app/models/patient/address.info.model';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { InsuranceQuestionnaireInfo } from 'src/app/models/questionnaire/insurance.questionnaire.info';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { PatientAddressValidator } from 'src/app/validators/patient.validator/patient.address.validator';
import { PatientEssentialValidator } from 'src/app/validators/patient.validator/patient.essential.validator';
import { PatientMedicalQuestionnaireValidator } from 'src/app/validators/patient.validator/patient.medical.questionnaire.validator';
import { PatientValidator } from 'src/app/validators/patient.validator/patient.validator';
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

  counter: number = 4;
  progressValue: number = 0;
  windowScrolled: boolean = true;
  validator: ValidatorContainer;
  patientValidator: PatientValidator = new PatientValidator();
  modelName: string = '';
  patient: Patient = new Patient();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentModel.subscribe(model => {
      this.validator = this.patientValidator.validate(this.modelName, model, this.patient)
    });

  }

  next(patientModel: string) {
    this.modelName = patientModel;
    this.pateintModelRequesterService.requestPateintModel(patientModel);
    if (this.validator.isValid) {
      Patientcache.cache(this.modelName,this.patient)
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
    this.counter--;
    this.calculatePercentage(this.counter, 'back');
    this.validator = new ValidatorContainer();
  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
}
