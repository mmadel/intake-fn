import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-information',
  templateUrl: './insurance-information.component.html',
  styleUrls: ['./insurance-information.component.css']
})
export class InsuranceInformationComponent implements OnInit {
  isWorkerCompNoFault: string = '';
  accidentType: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  workerCompNoFaultQChange(val: string) {
    this.isWorkerCompNoFault = val;
  }
  relatedInjuryAutoAccidentChange(val: string) {
    this.accidentType=val;

  }
}
