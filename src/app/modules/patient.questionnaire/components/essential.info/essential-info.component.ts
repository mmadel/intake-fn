import { Component, Input, OnInit } from '@angular/core';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { Patient } from 'src/app/models/patient/patient.model';
import { BasicInfoRequired } from 'src/app/models/validation/basic.info';
@Component({
  selector: 'app-essential-info',
  templateUrl: './essential-info.component.html',
  styleUrls: ['./essential-info.component.css']
})
export class EssentialInfoComponent implements OnInit {
  pateintBasicInfo: Basic = new Basic()
  @Input() requiredFields: BasicInfoRequired;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('patient') !== null) {
      var pateint: Patient = JSON.parse(localStorage.getItem('patient') || '{}')
      if (pateint.basicInfo !== undefined) {
        this.pateintBasicInfo = pateint.basicInfo;
      } else {
        this.pateintBasicInfo = new Basic();
      }
    } else {
      this.pateintBasicInfo = new Basic();
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
