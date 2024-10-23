import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, retry, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrustDevice } from '../../models/trust.device/trust.device';
import { ClinicService } from '../clinic/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class TrustDeviceService {
  private trustDeviceURL = environment.baseURL + 'trusted-device'
  constructor(private http: HttpClient, private clinicService: ClinicService) { }
  public list() {
    return this.clinicService.selectedClinic$.pipe(
      filter(clinic => clinic !== null),
      switchMap(clinicId =>
        this.http
          .get<TrustDevice[]>(`${this.trustDeviceURL}` + '/list/clinic-id/' + clinicId)
      ))
  }

  public generateDeviceRequest() {
    const headers = { 'content-type': 'application/json' }
    return this.clinicService.selectedClinic$.pipe(
      filter(clinic => clinic !== null),
      switchMap(clinicId =>
        this.http.post(`${this.trustDeviceURL}` + '/generate-token', JSON.stringify(clinicId), { 'headers': headers, observe: 'response' })
      ))
  }
}
