import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, switchMap, tap, zip } from 'rxjs';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { LocalService } from 'src/app/modules/common';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';

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


  ngOnInit(): void {
    //result[0] clinicId
    //result[1][0] startDate filter
    //result[1][1] endDate filter
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap((result) => console.log(result[0])),
        filter((result) => result[0] !== null),
        switchMap(result => this.dashboardService.getDate(result[0], Number(this.localService.getData("userId") || '{}')
          , result[1] === null ? 0 : result[1][0]
          , result[1] === null ? 0 : result[1][1])
        )).subscribe(data => this.dashboardDataContainer = <DashboardDataContainer>data);
  }
  ngOnDestroy() {
    this.clinicService.selectedClinic$
    this.clinicService.filterDate$
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
