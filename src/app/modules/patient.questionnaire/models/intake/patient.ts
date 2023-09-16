import { PatientEssentialInformation } from "./essential/patient.essential.information";
import { PatientGrantor } from "./patient.grantor";

export interface Patient {
    id?: number;
    patientEssentialInformation?: PatientEssentialInformation;
    patientMedical?: PatientMedical;
    patientInsurance?: PatientInsurance;
    patientGrantor?: PatientGrantor;
    patientSource?: PatientSource;
    patientSignature?: PatientSignature;
    patientAgreements?: PatientAgreement[];
  }