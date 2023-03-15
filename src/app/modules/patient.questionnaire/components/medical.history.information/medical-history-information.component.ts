import { Component, OnInit } from '@angular/core';
import { MedicalHistroyInformation } from 'src/app/models/questionnaire/medical/history/medical.history.info';

@Component({
  selector: 'app-medical-history-information',
  templateUrl: './medical-history-information.component.html',
  styleUrls: ['./medical-history-information.component.css']
})
export class MedicalHistoryInformationComponent implements OnInit {
  model: MedicalHistroyInformation = new MedicalHistroyInformation();
  isScanning: string = '';
  isMetalImplantation: string = '';
  isPaceMakerChange: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(JSON.stringify(this.model))
  }
  scanningChange(val: string) {
    this.isScanning = val;
  }
  metalImplantsChange(val: string) {
    this.isMetalImplantation = val;
  }
  paceMakerChange(val: string) {
    this.isPaceMakerChange = val;
  }

}
