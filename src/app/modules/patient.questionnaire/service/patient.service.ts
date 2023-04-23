import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AgreementHolder } from 'src/app/models/patient/agreements/agreements.holder';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = environment.baseURL + 'patient'
  private agreementURL = environment.baseURL + 'agreement';
  constructor(private http: HttpClient) { }
  createPatient(patient: string) {
    const createPatientURL = this.baseUrl + '/create';
    const headers = { 'content-type': 'application/json' }
    console.log(patient);
    return this.http.post(createPatientURL, patient, { 'headers': headers, observe: 'response' })
  }

  upload(imageFormData: FormData, pateintId: number) {
    const uploadURL = this.baseUrl + '/upload';
    let headers = new HttpHeaders({ 'patientId': pateintId.toString() });

    return this.http.post(uploadURL, imageFormData, { 'headers': headers, observe: 'response' })
  }

  getAgreement(){
    return this.http.get<AgreementHolder[]>(this.agreementURL, { observe: 'response' })
  }
}
