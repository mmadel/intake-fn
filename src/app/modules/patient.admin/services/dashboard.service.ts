import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.dashboardBaseUrl
  constructor(private httpClient: HttpClient) { }

  public getDate(){
    const retrievePatientRequiredFieldsURL = this.baseUrl + 'data';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
