import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatientDocumentComponent } from '../../components/patient.document/patient-document.component';

@Injectable({
  providedIn: 'root'
})
export class PatientDocumentService {
  private patientDocumentComponent: PatientDocumentComponent | null = null;
  setPatientDocumentComponent(patientDocumentComponent: PatientDocumentComponent) {
    this.patientDocumentComponent = patientDocumentComponent;
  }
  getPatientDocumentComponent() :PatientDocumentComponent | null{
    return this.patientDocumentComponent;
  }
  constructor() { }
}
