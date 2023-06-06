import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InsuranceCompany } from '../../models/insurance.company.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyService {
  private userUrl = environment.baseURL + 'insurance/company'
  constructor(private http:HttpClient) { }
  get() {
    return this.http.get<InsuranceCompany[]>(`${this.userUrl}` + '/find', { observe: 'response' })
  }
}
