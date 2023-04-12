import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  public getDate() {
    const retrievePatientRequiredFieldsURL = environment.baseURL + 'dashboard/data';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
