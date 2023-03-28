import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import entityValues from './_entity.values';

@Component({
  selector: 'app-recommendation.report',
  templateUrl: './recommendation.report.component.html',
  styleUrls: ['./recommendation.report.component.css']
})
export class RecommendationReportComponent implements OnInit {
  recommendationValue: string = '';
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
  constructor() { }

  ngOnInit(): void {
  }

}
