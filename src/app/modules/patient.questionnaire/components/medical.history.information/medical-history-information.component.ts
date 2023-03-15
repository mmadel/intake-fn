import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicalHistroyInformation } from 'src/app/models/questionnaire/medical/history/medical.history.info';
import { PateintModelRequesterService } from '../../service/validator/patient/pateint-model-requester.service';

@Component({
  selector: 'app-medical-history-information',
  templateUrl: './medical-history-information.component.html',
  styleUrls: ['./medical-history-information.component.css']
})
export class MedicalHistoryInformationComponent implements OnInit {
  model: MedicalHistroyInformation = new MedicalHistroyInformation();
  isScanning: string = '';
  isMetalImplantation: string = '';
  isPacemaker: string = ''
  constructor(private pateintModelRequesterService: PateintModelRequesterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.medicalHistroyInformation !== undefined)
        this.model = pateint.medicalHistroyInformation;
      else
        this.model = new MedicalHistroyInformation();
    }
    this.pateintModelRequesterService.currentModelName.subscribe(msg => {
      if (msg === 'medical-history') {
        this.pateintModelRequesterService.sendPateintModel(JSON.stringify(this.model))
      }
    });
  }

  test() {
    console.log(JSON.stringify(this.model))
  }
  scanningChange(val: string) {
    this.isScanning = val;
    val === 'yes'? this.model.isScannig = true :this.model.isScannig = false; 
  }
  metalImplantsChange(val: string) {
    this.isMetalImplantation = val;
    val === 'yes'? this.model.isMetalImplantation = true :this.model.isMetalImplantation = false; 
  }
  paceMakerChange(val: string) {
    this.isPacemaker = val;
    val === 'yes'? this.model.isPacemaker = true :this.model.isPacemaker = false;
  }

}
