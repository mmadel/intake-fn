import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Address } from 'src/app/models/patient/address.info.model';
import { PatientEssentialInformation } from '../../models/intake/essential/patient.essential.information';
import { PatientInsurance } from '../../models/intake/Insurance/patient.insurance';
import { PatientMedical } from '../../models/intake/medical/patient.medical';
import { PatientAgreement } from '../../models/intake/patient.agreement';
import { PatientGrantor } from '../../models/intake/patient.grantor';
import { PatientSignature } from '../../models/intake/patient.signature';
import { PatientSource } from '../../models/intake/source/patient.source';

@Injectable({
  providedIn: 'root'
})
export class PatientStoreService {
  patientEssentialInformation?: PatientEssentialInformation;
  patientAddress?: Address;
  patientMedical?: PatientMedical;
  patientInsurance?: PatientInsurance;
  patientGrantor?: PatientGrantor;
  patientSource?: PatientSource;
  patientSignature?: PatientSignature;
  patientAgreements?: PatientAgreement[];
  resetPateint() {

  }
  constructor(@Optional()  @SkipSelf() sharedService?:PatientStoreService) { 
    if(sharedService){
      throw new Error('PatientStoreService is already loaded')
    }
    console.log('PatientStoreService created....!!!!');
  }
}
