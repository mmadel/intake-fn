import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  public getDate(clinicId: number | null, userId: string | undefined, startDate: number | null, endDate: number | null) {
    const retrievePatientRequiredFieldsURL = environment.baseURL + 'dashboard/data'
      + '/clinicId/' + clinicId
      + "/userId/" + userId
      + "/startDate/" + startDate
      + "/endDate/" + endDate;
    return this.httpClient.get(retrievePatientRequiredFieldsURL)
  }
}
