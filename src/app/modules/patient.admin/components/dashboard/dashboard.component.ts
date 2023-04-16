import { Component, OnInit } from '@angular/core';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardDataContainer: DashboardDataContainer;
  constructor(private dashboardService: DashboardService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.selectedAdminClinic$.subscribe(clinicId => {
      if (clinicId !== null)
        this.dashboardService.getDate(clinicId, Number(localStorage.getItem("userId") || '{}')).subscribe(data => {
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
