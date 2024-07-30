import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cilArrowTop, cilOptions } from '@coreui/icons';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, filter, switchMap, tap } from 'rxjs';
import { DashboardDataContainer } from 'src/app/models/dashboard/dashboard.data.container';
import { KcAuthServiceService } from 'src/app/modules/security/service/kc/kc-auth-service.service';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardService } from '../../services/dashboard.service';
import { PatientsCounterService } from '../../services/patient.counters/patients-counter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public users: any[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  dashboardDataContainer: DashboardDataContainer | null;
  years: number[] = [];
  clinicId: number | null;
  startDate: number = 0;
  endDate: number = 0;
  filterStartDate: number;
  filterEndDate: number
  isFiltered: boolean;
  noShow:BehaviorSubject<boolean|null>;
  icons = { cilOptions, cilArrowTop };

  data: any = {};
  options: any = {};

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  datasets = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 250, 51, 55, 40,100,500]
    }
  ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };
  constructor(private dashboardService: DashboardService, 
    private clinicService: ClinicService,
    private kcAuthServiceService: KcAuthServiceService,
    private router: Router,
    private patientsCounterService:PatientsCounterService) { }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 5; i++) {
      this.years.push(currentYear - i);
    }
    this.data = {
      labels: this.labels.slice(0, this.datasets[0].data.length),
      datasets: this.datasets
    };
    this.options = this.optionsDefault;
  
    this.noShow = this.clinicService.preventUser$;
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
  logout() {
    this.kcAuthServiceService.logout()
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
  onChange(selectedYear:any){
    this.patientsCounterService.selectedYear$.next(selectedYear.target.value)
  }
}
