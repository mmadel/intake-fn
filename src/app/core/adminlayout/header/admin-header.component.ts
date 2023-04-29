import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectOption, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { result } from 'lodash';
import * as moment from 'moment';
import { mergeMap, tap } from 'rxjs';
import { LocalService } from 'src/app/modules/common';
import { Clinic } from 'src/app/modules/patient.admin/models/clinic.model';
import { ClinicService } from 'src/app/modules/patient.admin/services/clinic/clinic.service';
import { AuthService } from 'src/app/modules/security/service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})


export class AdminHeaderComponent extends HeaderComponent {
  startDate: number;
  endDate: number;
  public customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ],
    'Last 7 Days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date())
    ],
    'Last 30 Days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date())
    ],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ],
    'Clear':[
      null,
      null
    ]
  };
  userName: string;
  clinics: Clinic[] = new Array();
  selectedClinicId: number;
  @ViewChild('userClinics') userClinics: ElementRef;
  public get classToggler(): ClassToggleService {
    return this._classToggler;
  }
  public set classToggler(value: ClassToggleService) {
    this._classToggler = value;
  }

  @Input() sidebarId: string = "sidebar1";



  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private _classToggler: ClassToggleService, private authService: AuthService, private router: Router
    , private clinicService: ClinicService
    , private localService: LocalService) {
    super();
  }
  ngOnInit(): void {
    this.userName = this.localService.getData('userName');
    this.userName = this.userName.charAt(0).toUpperCase()
    this.clinicService.getByUserId(Number(this.localService.getData('userId') || {})).subscribe(response => {
      response.body?.forEach(element => {
        this.clinics.push(element);
      });
      this.clinicService.selectedClinic$.next(this.clinics[0].id)
    })
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  setSelectedClinic(event: any) {
    this.clinicService.selectedClinic$.next(event.target.value)
  }
  startDateChange(event: any) {
    this.startDate = Number(moment(new Date(event)).format("x"))

  }
  endDateChange(event: any) {
    this.endDate = Number(moment(new Date(event)).format("x"))
    this.emitFilterDate(this.startDate, this.endDate)
  }
  emitFilterDate(startDate: number, endDate: number) {
    var validDate = this.validateDateCriteria(startDate, endDate)
    if (validDate) {
      var dates: number[] = [startDate, endDate]
      this.clinicService.filterDate$.next(dates)
    }
  }
  validateDateCriteria(startDate: number, endDate: number): boolean {
    if (startDate > endDate) {
      console.log('this.dashBoardDateCriteria.startDate ' + startDate);
      console.log('this.dashBoardDateCriteria.endDate ' + endDate);
      console.log('this.dashBoardDateCriteria.startDate > this.dashBoardDateCriteria.endDate');
      return false;
    }

    if (isNaN(startDate)) {
      console.log('isNaN(this.dashBoardDateCriteria.startDate)');
      return false;
    }
    if (isNaN(endDate)) {
      console.log('isNaN(this.dashBoardDateCriteria.endDate)');
      return false;
    }
    return true;
  }
}
