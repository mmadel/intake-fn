import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientSearchCriteria } from 'src/app/models/reporting/patient.search.criteria';
import { environment } from 'src/environments/environment';
export interface IPatientResult {
  firstName: string;
  middleName: string;
  email: string;
  country: string;
  phoneType: string;
  phoneNumber: string;
  idType: string,
  patientId: string
  createdAt: number
}
export interface ISearchResult {
  resultCount: number;
  result: IPatientResult[];
}
@Injectable({
  providedIn: 'root'
})
export class PatientReportingService {
  private baseUrl = environment.baseURL + 'reports/';
  constructor(private httpClient: HttpClient) { }

  search(searchCriteria: PatientSearchCriteria) {
    const changePatientRequiredFieldsURL = this.baseUrl + 'recommendation';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(searchCriteria), { 'headers': headers })
  }

  export(result: IPatientResult[]) {
    const headers = { 'content-type': 'application/json' }
    const changePatientRequiredFieldsURL = this.baseUrl + 'generator/excel';
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(result), { 'headers': headers, responseType: 'blob' })
  }

  exportPDF(insuranceWorkerType: string, patientSourceType: string, hasPhysicalTherapy: boolean, patientId: number) {
    const exportPDFURL = this.baseUrl + 'generator/pdf?insuranceWorkerType=' + insuranceWorkerType
      + '&patientSourceType=' + patientSourceType + '&hasPhysicalTherapy=' + hasPhysicalTherapy
      + '&patientId=' + patientId;
    return this.httpClient.post(exportPDFURL, {
      headers: {
        "Accept": "application/pdf"
      },
      responseType: "blob"
    })
  }
}
