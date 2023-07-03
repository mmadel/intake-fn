import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private clinicUrl = environment.baseURL + 'clinic'
  private userUrl = environment.baseURL + 'user'
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
  constructor(private http: HttpClient) { }

  create(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(`${this.clinicUrl}`, JSON.stringify(clinic), { 'headers': headers, observe: 'response' })
  }
  get() {
    return this.http.get<Clinic[]>(`${this.clinicUrl}` + '/find', { observe: 'response' })
  }
  getByUserId(userId: number) {
    return this.http.get<Clinic[]>(`${this.userUrl}` + '/find/clinics/' + userId, { observe: 'response' })
  }

}
