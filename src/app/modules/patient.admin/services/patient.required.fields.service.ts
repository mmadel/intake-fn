import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientFields } from 'src/app/models/validation/patient.fields';

@Injectable({
  providedIn: 'root'
})
export class PatientRequiredFieldsService {

  private baseUrl = "http://localhost:8080/patient/admin"
  constructor(private httpClient: HttpClient) { }

  change(patientFields: PatientFields) {
    const changePatientRequiredFieldsURL = this.baseUrl + '/change/requires/fields';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(patientFields), { 'headers': headers, observe: 'response' })
  }

  retrieve(){
    const retrievePatientRequiredFieldsURL = this.baseUrl + '/retrieve/requires/fields';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
