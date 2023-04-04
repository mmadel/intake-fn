import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientSearchCriteria } from 'src/app/models/reporting/patient.search.criteria';
export interface IPatientResult {
  firstName: string;
  middleName: string;
  email: string;
  country: string;
  phoneType: string;
  phoneNumber: string;
  idType: string,
  patientId: string
  createdAt:number
}
export interface ISearchResult {
  resultCount: number;
  result: IPatientResult[];
}
@Injectable({
  providedIn: 'root'
})
export class PatientReportingService {
  private baseUrl = "http://localhost:8080/reports"
  constructor(private httpClient: HttpClient) { }

  search(searchCriteria: PatientSearchCriteria) {
    const changePatientRequiredFieldsURL = this.baseUrl + '/recommendation';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(searchCriteria), { 'headers': headers })
  }

  export(result: IPatientResult[]) {
    const headers = { 'content-type': 'application/json' }
    const changePatientRequiredFieldsURL = this.baseUrl + '/generator/excel';
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(result), { 'headers': headers, responseType: 'blob' })
  }
}
