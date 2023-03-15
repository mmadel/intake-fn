import { Component, OnInit } from '@angular/core';
import { Patientcache } from 'src/app/caching/patient.caching';
import { Patient } from 'src/app/models/patient/patient.model';
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
    { "id": 1, "name": "Basic Information" },
    { "id": 2, "name": "Address Information" },
    { "id": 3, "name": "Medicial Information" },
    { "id": 4, "name": "Medicial History Information" },
    { "id": 5, "name": "Insurance Information" },
    { "id": 6, "name": "Aggreements" },
    
  ];

  counter: number = 6;
  progressValue: number = 0;
  windowScrolled: boolean = true;
  validator: ValidatorContainer;
  patientValidator: PatientValidator = new PatientValidator();
  modelName: string = '';
  patient: Patient = new Patient();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentModel.subscribe(model => {
      if (model !== '' || model !== undefined) {
        this.validator = this.patientValidator.validate(this.modelName, model, this.patient)
      }
    });
  }


  next(patientModel: string) {
    this.modelName = patientModel;
    this.pateintModelRequesterService.requestPateintModel(patientModel);
    if (this.validator.isValid) {
      Patientcache.cache(this.modelName, this.patient)
      this.calculatePercentage(this.counter, 'next')
      this.counter++;
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
