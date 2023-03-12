import { Component, OnInit } from '@angular/core';
import { ProgressServiceService } from 'src/app/modules/patient.questionnaire/service/progress-service.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  progressValue: string = '';
  constructor(private progressService: ProgressServiceService) { }

  ngOnInit(): void {
    this.progressService.currentProgressValue.subscribe(val => this.progressValue = val);
  }

}
