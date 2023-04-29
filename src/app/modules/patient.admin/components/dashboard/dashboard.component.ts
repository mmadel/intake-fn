import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { LocalService } from 'src/app/modules/common';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashBoardDateCriteria } from './model/dash.board.date.criteria';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardDataContainer: DashboardDataContainer | null;

  clinicId: number | null;
  startDate: number = 0;
  endDate: number = 0;
  constructor(private dashboardService: DashboardService, private clinicService: ClinicService
    , private localService: LocalService) { }

  private fetchData() {
    if (this.clinicId !== null) {
      this.dashboardService.getDate(this.clinicId, Number(this.localService.getData("userId") || '{}')
        , this.startDate
        , this.endDate).subscribe(data => {
          this.dashboardDataContainer = <DashboardDataContainer>data;
        })
    }
  }

  ngOnInit(): void {
    this.clinicService.selectedClinic$.subscribe(clinicId => {
      this.clinicId = clinicId;
      this.clinicService.filterDate$.subscribe(dates => {
        if (dates !== null) {
          this.startDate = dates![0];
          this.endDate = dates![1];
          this.fetchData();
        } else {
          this.fetchData();
        }
      })
    })
  }
  getColor(percentage: number): string {
    var color: string = "";
    if (percentage > 1 && percentage < 10)
      color = "danger"
    if (percentage > 10 && percentage < 30)
      color = "primary"
    if (percentage > 30 && percentage < 70)
      color = "success"
    if (percentage > 70)
      color = "success"
    return color;
  }
}
