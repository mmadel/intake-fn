import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = environment.patientBaseUrl
  constructor(private http: HttpClient) { }
  createPatient(patient: string) {
    const createPatientURL = this.baseUrl + 'patient';
    const headers = { 'content-type': 'application/json' }
    console.log(patient);
    return this.http.post(createPatientURL, patient, { 'headers': headers, observe: 'response' })
  }

  upload(imageFormData: FormData, pateintId: number) {
    const createPatientURL = this.baseUrl + 'upload';
    let headers = new HttpHeaders({ 'patientId': pateintId.toString() });

    return this.http.post(createPatientURL, imageFormData, { 'headers': headers, observe: 'response' })
  }
}
