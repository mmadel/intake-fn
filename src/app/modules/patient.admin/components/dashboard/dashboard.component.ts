import { Component, OnInit } from '@angular/core';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { LocalService } from 'src/app/modules/common';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardDataContainer: DashboardDataContainer;
  public mainChart: IChartProps = {};
  constructor(private dashboardService: DashboardService, private clinicService: ClinicService
    , private localService: LocalService,
    private chartsData: DashboardChartsData) { }
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
  ngOnInit(): void {
    this.initCharts();
    this.clinicService.selectedClinic$.subscribe(clinicId => {
      if (clinicId !== null)
        this.dashboardService.getDate(clinicId, Number(this.localService.getData("userId") || '{}')).subscribe(data => {
          this.dashboardDataContainer = <DashboardDataContainer>data;
        })
    })
  }
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [40, 20, 12, 39, 10, 80, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [50, 12, 28, 29, 7, 25, 60]
      }
    ]
  };

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.data.labels.push('August');
      this.data.datasets[0].data.push(60);
      this.data.datasets[1].data.push(20);
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }
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
