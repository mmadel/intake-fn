import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Audit } from '../../models/audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private auditUrl = environment.baseURL + 'audit'
  constructor(private http: HttpClient) { }

  getClinicAuditDataByUUID(uuid: string) {
    return this.http.get<Audit[]>(`${this.auditUrl}` + '/clinic/retrieve/uuid/' + uuid, { observe: 'response' })
  }
  getInsuranceCompanyAuditDataByUUID(uuid: string) {
    return this.http.get<Audit[]>(`${this.auditUrl}` + '/insurance/company/retrieve/uuid/' + uuid, { observe: 'response' })
  }
  getClinicAuditData() {
    return this.http.get<Audit[]>(`${this.auditUrl}` + '/clinic/retrieve', { observe: 'response' })
  }
  getInsuranceCompanyAuditData() {
    return this.http.get<Audit[]>(`${this.auditUrl}` + '/insurance/company/retrieve/', { observe: 'response' })
  }
  getAllAuditDataByUUID(uuid: string) {
    return this.http.get<Audit[]>(`${this.auditUrl}` + '/retrieve/uuid/' + uuid, { observe: 'response' })
  }
}
