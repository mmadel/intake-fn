import { Component, OnInit } from '@angular/core';
import { ProgressServiceService } from '../../service/progress-service.service';

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
  constructor(private progressService: ProgressServiceService) { }

  ngOnInit(): void {

  }

  next() {
    this.calculatePercentage(this.counter, 'next')
    this.counter++;
    ;
  }
  back() {
    this.counter--;
    this.calculatePercentage(this.counter, 'back');

  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
}
