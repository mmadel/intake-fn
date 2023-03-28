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
  ];
  colors = { color: 'primary', textColor: 'primary' };

  ngOnInit(): void {
    this.result = {
      resultCount: 0,
      result: []
    }
  }
  search() {
    this.formatDate();
    this.requestSearchService();

  }

  private formatDate() {
    if (this.patientSearchCriteria.startDate_date !== undefined)
      this.patientSearchCriteria.startDate = Number(moment(this.patientSearchCriteria.startDate_date).format("x"))
    if (this.patientSearchCriteria.endDate_date !== undefined)
      this.patientSearchCriteria.endDate = Number(moment(this.patientSearchCriteria.endDate_date).format("x"))
  }

  private requestSearchService() {
    if (this.patientSearchCriteria.type !== '') {
      this.searchInputNotValid = false
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
}
