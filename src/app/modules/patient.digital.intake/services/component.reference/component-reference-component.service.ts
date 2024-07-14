import { Injectable } from '@angular/core';
import { PatientBasicComponent } from '../../components/patient.basic/patient-basic.component';
import { PatientDocumentComponent } from '../../components/patient.document/patient-document.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentReferenceComponentService {
  private patientDocumentComponent: PatientDocumentComponent | null = null;
  private patientBasicComponent: PatientBasicComponent | null = null;
  constructor() { }
  setPatientBasicComponent(patientBasicComponent: PatientBasicComponent) {
    this.patientBasicComponent = patientBasicComponent
  }
  getPatientBasicComponent(): PatientBasicComponent | null {
    return this.patientBasicComponent
  }
  setPatientDocumentComponent(patientDocumentComponent: PatientDocumentComponent) {
    this.patientDocumentComponent = patientDocumentComponent;
  }
  getPatientDocumentComponent(): PatientDocumentComponent | null {
    return this.patientDocumentComponent;
  }
}
