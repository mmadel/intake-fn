import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.css']
})
export class MedicalInfoComponent implements OnInit {
  isReferringDoctor: string = '';
  isphysicalTherapy: string = '';
  constructor() { }

  referringDoctorQChange(val: string) {
    this.isReferringDoctor = val;
  }
  physicalTherapyQChange(val: string) {
    this.isphysicalTherapy = val;
  }
  ngOnInit(): void {
  }

}
