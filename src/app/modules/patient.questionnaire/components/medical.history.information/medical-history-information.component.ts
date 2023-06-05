import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { MedicalHistroyInformation } from 'src/app/models/questionnaire/medical/history/medical.history.info';
import { MedicalHistoryInfoRequired } from 'src/app/models/validation/medical.history.info.required';
import { LocalService } from 'src/app/modules/common';
import { IPatientCondition } from './patient.condition';

@Component({
  selector: 'app-medical-history-information',
  templateUrl: './medical-history-information.component.html',
  styleUrls: ['./medical-history-information.component.css']
})
export class MedicalHistoryInformationComponent implements OnInit {
  model: MedicalHistroyInformation = new MedicalHistroyInformation();
  @Input() requiredFields: MedicalHistoryInfoRequired;
  isScanning: string = '';
  isMetalImplantation: string = '';
  isPacemaker: string = ''
  patientConditions: IPatientCondition[];
  heightUnit: boolean = false;
  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.createPatientConditions();
    if (this.localService.getData('patient') !== null) {
      var pateint: Patient = JSON.parse(this.localService.getData('patient') || '{}')
      if (pateint.medicalHistoryInformation !== undefined) {
        this.model = pateint.medicalHistoryInformation;
        if (pateint.medicalHistoryInformation.metalImplantation)
          this.isMetalImplantation = 'yes'
        else if (pateint.medicalHistoryInformation.metalImplantation === false)
          this.isMetalImplantation = 'no'
        //pateint.medicalHistoryInformation.metalImplantation ? this.isMetalImplantation = 'yes' : this.isMetalImplantation = 'no'
        if (pateint.medicalHistoryInformation.pacemaker)
          this.isPacemaker = 'yes'
        else if (pateint.medicalHistoryInformation.pacemaker === false)
          this.isPacemaker = 'no'
        //pateint.medicalHistoryInformation.pacemaker ? this.isPacemaker = 'yes' : this.isPacemaker = 'no'
        if (pateint.medicalHistoryInformation.scanningTest)
          this.isScanning = 'yes'
        else if (pateint.medicalHistoryInformation.scanningTest === false)
          this.isScanning = 'no'
        //pateint.medicalHistoryInformation.scanningTest ? this.isScanning = 'yes' : this.isScanning = 'no'
        if (this.model.patientCondition !== undefined)
          this.model.patientCondition.forEach(name => {
            this.patientConditions.forEach(condition => {
              if (name === condition.name)
                condition.selected = true
            })
          });
      }
      else
        this.model = new MedicalHistroyInformation();
    } else {
      this.model = new MedicalHistroyInformation();
    }

  }


  scanningChange(val: string) {
    this.isScanning = val;

    if (val === 'yes') {
      this.model.scanningTest = true
    } else {
      this.model.scanningTestValue = ''
      this.model.scanningTest = false;
    }
  }
  metalImplantsChange(val: string) {
    this.isMetalImplantation = val;
    val === 'yes' ? this.model.metalImplantation = true : this.model.metalImplantation = false;
  }
  paceMakerChange(val: string) {
    this.isPacemaker = val;
    val === 'yes' ? this.model.pacemaker = true : this.model.pacemaker = false;
  }
  createPatientConditions() {
    this.patientConditions =
      [{
        name: "Alzheimer's",
        selected: false
      }, {
        name: "Cardiovascular Disease",
        selected: false
      },
      {
        name: "Cauda Equina Syndrome",
        selected: false
      }, {
        name: "Cerebral Vascular Accident",
        selected: false
      }, {
        name: "Current Infection",
        selected: false
      }, {
        name: "Diabetes Mellitus Type 1",
        selected: false
      }, {
        name: "Diabetes Mellitus Type 2",
        selected: false
      }, {
        name: "Fibromyalgia",
        selected: false
      }, {
        name: "Fracture",
        selected: false
      }, {
        name: "History of Cancer",
        selected: false
      },
      {
        name: "Huntington's",
        selected: false
      }, {
        name: "Immunosuppression",
        selected: false
      }, {
        name: "Lupus",
        selected: false
      }, {
        name: "Muscular Dystrophy",
        selected: false
      }, {
        name: "Parkinson's",
        selected: false
      }, {
        name: "Obesity",
        selected: false
      }, {
        name: "Osteoarthritis",
        selected: false
      },
      {
        name: "Rheumatoid Arthritis",
        selected: false
      },
      {
        name: "Traumatic Brain Injury",
        selected: false
      }
      ]
  }
  changeHeightUnit(event: any) {
    if (this.heightUnit) {
      this.model.heightUnit = 'cm'
      this.model.height = (Number(this.model.height) / 0.3937 ).toFixed(2)+ '';
    }
    if (!this.heightUnit) {
      this.model.heightUnit = 'inch'
      this.model.height = (Number(this.model.height) * 0.3937 ).toFixed(2)+ '';
    }

  }
  isRequiredField(name: string): boolean {
    var field: boolean = false;
    Object.entries(this.requiredFields)
      .forEach(([key, value]) => {
        if (key === name) {
          field = value;
        }
      })
    return field;
  }
}
