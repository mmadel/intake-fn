import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = "http://localhost:8080/dashboard"
  constructor(private httpClient: HttpClient) { }

  public getDate(){
    const retrievePatientRequiredFieldsURL = this.baseUrl + '/data';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
