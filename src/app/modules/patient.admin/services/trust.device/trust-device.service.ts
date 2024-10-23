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
  constructor(private http: HttpClient,private clinicService: ClinicService) { }
  public list(){
    return this.clinicService.selectedClinic$.pipe(
      filter(clinic=> clinic !==null),
      switchMap(clinicId =>  
        this.http
          .get<TrustDevice[]>(`${this.trustDeviceURL}` + '/list/clinic-id/' + clinicId)
      ))
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
