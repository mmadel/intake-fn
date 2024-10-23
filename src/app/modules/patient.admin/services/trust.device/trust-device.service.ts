import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrustDevice } from '../../models/trust.device/trust.device';

@Injectable({
  providedIn: 'root'
})
export class TrustDeviceService {
  private trustDeviceURL = environment.baseURL + 'trusted-device'
  constructor(private http: HttpClient) { }
  public list(clinicId:number){
    return this.http.get<TrustDevice[]>(`${this.trustDeviceURL}` + '/list/clinic-id/' + clinicId, { observe: 'response' })
  }
}
