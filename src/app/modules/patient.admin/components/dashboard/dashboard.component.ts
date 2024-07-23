import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, filter, iif, switchMap, tap, zip } from 'rxjs';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { LocalService } from 'src/app/modules/common';
import { KcAuthServiceService } from 'src/app/modules/security/service/kc/kc-auth-service.service';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardDataContainer: DashboardDataContainer | null;

  clinicId: number | null;
  startDate: number = 0;
  endDate: number = 0;
  filterStartDate: number;
  filterEndDate: number
  isFiltered: boolean;
  constructor(private dashboardService: DashboardService, private clinicService: ClinicService
    , private kcAuthServiceService: KcAuthServiceService, private router: Router) { }


  ngOnInit(): void {
    if (this.kcAuthServiceService.isUserInRole('normal')) {
      this.router.navigateByUrl('admin/patient/list')
    }
    //result[0] clinicId
    //result[1][0] startDate filter
    //result[1][1] endDate filter
    this.kcAuthServiceService.loadUserProfile().then((userProfile) => {
      combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
        .pipe(
          tap((result) => console.log(result[0])),
          filter((result) => result[0] !== null),
          switchMap(result => this.dashboardService.getDate(result[0], userProfile.id
            , result[1] === null ? 0 : result[1][0]
            , result[1] === null ? 0 : result[1][1])
          )).subscribe(data => this.dashboardDataContainer = <DashboardDataContainer>data,
            (err) => console.log(err))
    })
  }
  ngOnDestroy() {
    this.clinicService.filterDate$.next(null)
  }
  getColor(percentage: number): string {
    var color: string = "";
    if (percentage >= 1 && percentage <= 10)
      color = "danger"
    if (percentage > 10 && percentage <= 30)
      color = "warning"
    if (percentage > 30 && percentage <= 70)
      color = "primary"
    if (percentage > 70)
      color = "success"
    return color;
  }
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
    'Clear': [
      0,
      0
    ]
  };
  startDateChange(event: any) {
    this.filterStartDate = event ? moment(new Date(event)).startOf('day').valueOf() : 0;
  }
  endDateChange(event: any) {
    this.filterEndDate = event ? moment(new Date(event)).endOf('day').valueOf() : 0;
    if (this.filterStartDate !== 0 && this.filterEndDate !== 0)
      this.isFiltered = true
    else
      this.isFiltered = false

    this.emitFilterDate(this.filterStartDate, this.filterEndDate)
  }
  emitFilterDate(startDate: number, endDate: number) {
    var dates: number[] = [startDate, endDate]
    this.clinicService.filterDate$.next(dates)
  }
}
