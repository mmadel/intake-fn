import { Injectable } from '@angular/core';
import { Patient } from '../../models/intake/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientStoreService {
  pateint: Patient = {};

  resetPateint() {
    this.pateint = {};
  }
  constructor() { }
}
