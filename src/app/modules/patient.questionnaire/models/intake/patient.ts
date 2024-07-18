import { Address } from "src/app/models/patient/address.info.model";
import { PatientAddress } from "src/app/modules/patient.digital.intake/models/patient.address";
import { PatientEssentialInformation } from "./essential/patient.essential.information";
import { PatientInsurance } from "./Insurance/patient.insurance";
import { PatientMedical } from "./medical/patient.medical";
import { PatientAgreement } from "./patient.agreement";
import { PatientGrantor } from "./patient.grantor";
import { PatientSignature } from "./patient.signature";
import { PatientSource } from "./source/patient.source";

export interface Patient {
  id?: number;
  patientEssentialInformation?: PatientEssentialInformation;
  patientAddress?:PatientAddress
  patientMedical?: PatientMedical;
  patientInsurance?: PatientInsurance;
  patientGrantor?: PatientGrantor;
  patientSource?: PatientSource;
  patientSignature?: PatientSignature;
  patientAgreements?: PatientAgreement;
  clinicId?: number;
  signature?:string;
}