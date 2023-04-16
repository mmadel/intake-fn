import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  public getDate(clinicId: number | null, userId: number) {
    const retrievePatientRequiredFieldsURL = environment.baseURL + 'dashboard/data'+'/clinicId/' + clinicId + "/userId/" + userId;
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
