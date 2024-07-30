import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { filter, map, Observable, tap } from 'rxjs';
import { PatientsCounterService } from '../../../services/patient.counters/patients-counter.service';
import { OptionsDefault } from '../patient.counters.widgets/chart.defautl.options';
import { ChartMonths } from '../patient.counters.widgets/chart.months';

@Component({
  selector: 'clinics-patients-chart',
  templateUrl: './clinics-patients-chart.component.html',
  styleUrls: ['./clinics-patients-chart.component.css']
})
export class ClinicsPatientsChartComponent implements OnInit {
  data$: Observable<any>
  options: any = {};
  constructor(private patientsCounterService: PatientsCounterService) { }
  data = {
    labels: ChartMonths,
    datasets: [
    ]
  };

  // handleChartRef($chartRef: any) {
  //   if ($chartRef) {
  //     console.log('handleChartRef', $chartRef);
  //     this.data.labels.push('August');
  //     this.data.datasets[0].data.push(60);
  //     this.data.datasets[1].data.push(20);
  //     setTimeout(() => {
  //       $chartRef?.update();
  //     }, 3000);
  //   }
  // }

  ngOnInit(): void {
    this.patientsCounterService.selectedYear$
      .pipe(
        tap(result => console.log(result))
        , map(result => {
          if (result === null)
            return new Date().getFullYear();
          else
            return result;
        }),
      )
      .subscribe((selectedYear: any) => {
        this.data$ = this.patientsCounterService.getPatientsClinicsChartData(selectedYear)
          .pipe(
            filter(result => result !== null),
            map((result: any) => {
              var mappedData: any = {
                labels: ChartMonths,
                datasets: []
              }
              var mappedDatasets: any[] = []
              const clinicCounts: { [clinic: string]: number[] } = {};
              result.forEach((item:any) => {
                if (!clinicCounts[item.clinicName]) {
                  // Initialize the array for this clinic with 12 zeros
                  clinicCounts[item.clinicName] = new Array(12).fill(0);
                }
                // Subtract 1 from month to get the correct array index (0-based index)
                clinicCounts[item.clinicName][item.month - 1] = item.count;
              });
              Object.keys(clinicCounts).forEach(key => {
                var color = this.random_rgba();
                var ds: any = {
                  label: key,
                  backgroundColor: color,
                  borderColor: color,
                  
                  pointBorderColor: color,
                  data: clinicCounts[key]
                }
                mappedDatasets.push(ds);
              })
              mappedData.datasets = mappedDatasets;
              return mappedData;
            })
          )
      })
  }
  private random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }
}
