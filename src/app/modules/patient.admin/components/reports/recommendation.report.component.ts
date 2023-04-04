import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { PatientSearchCriteria } from 'src/app/models/reporting/patient.search.criteria';
import { ISearchResult, PatientReportingService } from '../../services/patient.reporting.service';
import entityValues from './_entity.values';

@Component({
  selector: 'app-recommendation.report',
  templateUrl: './recommendation.report.component.html',
  styleUrls: ['./recommendation.report.component.css']
})
export class RecommendationReportComponent implements OnInit {
  searchInputNotValid: boolean = false;
  errorMsg: string;
  patientSearchCriteria: PatientSearchCriteria = new PatientSearchCriteria();
  result: ISearchResult;
  constructor(private patientReportingService: PatientReportingService) { }

  entityValues = entityValues;
  readonly columns: (string | IColumn)[] = [
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'middleName',
      label: 'Middle Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'country',
      label: 'Country'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'patientId',
      label: 'patientId'
    },
    {
      key: 'createdAt',
      label: 'created'
    },
  ];
  colors = { color: 'primary', textColor: 'primary' };
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
    ]
  };
  ngOnInit(): void {
    this.result = {
      resultCount: 0,
      result: []
    }
    console.log(this.result.result.length)
  }
  search() {
    this.formatDate();
    this.requestSearchService();

  }

  private formatDate() {
    if (this.patientSearchCriteria.startDate_date !== undefined)
      this.patientSearchCriteria.startDate = Number(moment(this.patientSearchCriteria.startDate_date).startOf('day').format("x"))
    if (this.patientSearchCriteria.endDate_date !== undefined)
      this.patientSearchCriteria.endDate = Number(moment(this.patientSearchCriteria.endDate_date).startOf('day').format("x"))
  }

  private requestSearchService() {
    console.log(this.patientSearchCriteria.startDate)
    if (this.patientSearchCriteria.type !== '' || (this.patientSearchCriteria.startDate > 0 && this.patientSearchCriteria.endDate > 0)) {
      this.searchInputNotValid = false
      if (this.patientSearchCriteria.doctorName === '')
        this.patientSearchCriteria.doctorName = null;
      if (this.patientSearchCriteria.doctorNPI === '')
        this.patientSearchCriteria.doctorNPI = null;
      if (this.patientSearchCriteria.type === '')
        this.patientSearchCriteria.type = null;
      console.log(JSON.stringify(this.patientSearchCriteria))
      this.patientReportingService.search(this.patientSearchCriteria).subscribe(
        (response) => {
          this.result = <ISearchResult>response;
        },
        (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        });
    }
    else {
      this.errorMsg = 'Please select patient Source Doctor/Entity input';
      this.searchInputNotValid = true
    }
  }
  exportResult() {
    this.patientReportingService.export(this.result.result).subscribe(
      (response) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(response)
        a.href = objectUrl
        var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        a.download = 'patient-' + nameDatePart + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.log(error)
      });
  }
}
