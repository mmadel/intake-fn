import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = "http://localhost:8080/"
  constructor(private http: HttpClient) { }
  createPatient(patient: string) {
    console.log('createPatient')
    const createPatientURL = this.baseUrl + 'patient';
    const headers = { 'content-type': 'application/json' }
    return this.http.post(createPatientURL, patient, { 'headers': headers, observe: 'response' })   
  }
}
