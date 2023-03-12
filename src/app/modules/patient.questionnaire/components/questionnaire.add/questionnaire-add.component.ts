import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
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
  validator: ValidatorContainer = new ValidatorContainer();
  patient: Patient = new Patient();
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    this.pateintModelRequesterService.currentValue.subscribe(model => {
      if (model !== '') {
        var pateintBasicInfo: Basic = JSON.parse(model);
        this.patient.basicInfo = pateintBasicInfo;
        var validator: PatientEssentialValidator = new PatientEssentialValidator();
        pateintBasicInfo.birthDate = Number(moment(pateintBasicInfo.birthDate_date).format("x"));

        pateintBasicInfo.ideffective_from = Number(moment(pateintBasicInfo.id_effective_from_date).format("x"))
        pateintBasicInfo.ideffective_to = Number(moment(pateintBasicInfo.id_effective_to_date).format("x"))
        validator.setModel(pateintBasicInfo);
        this.validator = validator.validate();
        console.log(JSON.stringify(this.validator))
      }
    });

  }

  next(patientModel: string) {
    this.pateintModelRequesterService.requestPateintModel(patientModel);
    if (this.validator.isValid) {
      localStorage.setItem('patient' ,JSON.stringify(this.patient))
      this.calculatePercentage(this.counter, 'next')
      this.counter++;
      ;
    }
  }
  back() {
    this.pateintModelRequesterService.backPateintModel(JSON.stringify(this.patient.basicInfo));
    this.counter--;
    this.calculatePercentage(this.counter, 'back');

  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
}
