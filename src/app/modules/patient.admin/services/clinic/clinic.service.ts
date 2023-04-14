import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private clinicUrl = environment.baseURL + 'clinic'
  constructor(private http: HttpClient) { }

  create(clinic: Clinic) {
    return this.http.post(`${this.clinicUrl}`, JSON.stringify(clinic), { observe: 'response' })
  }
  get(){
    return this.http.get<Clinic[]>(`${this.clinicUrl}`+'/find', { observe: 'response' })
  }
}
