import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { PatientSearchCriteria } from 'src/app/models/reporting/patient.search.criteria';
import { LocalService } from 'src/app/modules/common';
import { ClinicService } from '../../services/clinic/clinic.service';
import { ISearchResult, PatientReportingService } from '../../services/patient.reporting.service';
import entityValues from './_entity.values';
interface PateintSourceSelects {
  name: string | null,
  value: string | null;
}

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
  constructor(private patientReportingService: PatientReportingService,
    private clinicService: ClinicService
    , private localService: LocalService) { }

  entityValues = entityValues;
  pateintSourceSelects: PateintSourceSelects[] = [
    {
      name: "Doctor",
      value: "Doctor"
    },
    {
      name: "Entity",
      value: "Entity"
    }

  ]
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
  }
  search() {
    this.formatDate();
    this.requestSearchService();

  }

  private formatDate() {
    
    if (this.patientSearchCriteria.startDate_date !== undefined)
      this.patientSearchCriteria.startDate = this.patientSearchCriteria.startDate_date ? moment(new Date(this.patientSearchCriteria.startDate_date)).startOf('day').valueOf() : 0;
    if (this.patientSearchCriteria.endDate_date !== undefined)
      this.patientSearchCriteria.endDate = this.patientSearchCriteria.endDate_date ? moment(new Date(this.patientSearchCriteria.endDate_date)).endOf('day').valueOf() : 0;
  }


  private requestSearchService() {
    if (!this.checkEmptyOfpatientSearchCriteria()) {
      this.searchInputNotValid = false
      this.FillEmptyFieldsInSearchCriteria();
      this.clinicService.selectedClinic$.subscribe(id => {
        this.patientSearchCriteria.clinicId = id;
        this.patientReportingService.search(this.patientSearchCriteria).subscribe(
          (response) => {
            this.result = <ISearchResult>response;
          },
          (error) => {
            this.errorMsg = 'Server is down please contact the administrator';
            this.searchInputNotValid = true
            this.result = {
              resultCount: 0,
              result: []
            }
          });
      })
    }
    else {
      this.errorMsg = 'Please select patient Source Doctor/Entity input Or Date Range';
      this.searchInputNotValid = true
      this.result = {
        resultCount: 0,
        result: []
      }
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

  private FillEmptyFieldsInSearchCriteria() {
    if (this.patientSearchCriteria.type === 'Doctor')
      this.patientSearchCriteria.entityNames = null
    if (this.patientSearchCriteria.type === 'Entity') {
      this.patientSearchCriteria.doctorName = null
      this.patientSearchCriteria.doctorNPI = null
    }
  }

  private checkEmptyOfpatientSearchCriteria() {
    var source: boolean = this.patientSearchCriteria.type === '' || this.patientSearchCriteria.type === null || this.patientSearchCriteria.type === 'null';
    var dateRange: boolean =
      (this.patientSearchCriteria.startDate === undefined || this.patientSearchCriteria.startDate === null || Number.isNaN(this.patientSearchCriteria.startDate))
      ||
      (this.patientSearchCriteria.endDate === undefined || this.patientSearchCriteria.endDate === null || Number.isNaN(this.patientSearchCriteria.endDate))
    if (source && dateRange)
      return true
    else
      return false;
  }
}
