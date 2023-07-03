import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientRequiredFields } from 'src/app/models/validation/patient.fields';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientRequiredFieldsService {

  private baseUrl = environment.baseURL + 'requires/fields/';
  constructor(private httpClient: HttpClient) { }

  change(patientFields: PatientRequiredFields) {
    const changePatientRequiredFieldsURL = this.baseUrl + 'change';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(patientFields), { 'headers': headers, observe: 'response' })
  }

  retrieve() {
    const retrievePatientRequiredFieldsURL = this.baseUrl + 'retrieve';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }

  retrieveRequiredBasisInfo() {
    const retrievePatientRequiredFieldsURL = this.baseUrl + 'retrieve/basic';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
