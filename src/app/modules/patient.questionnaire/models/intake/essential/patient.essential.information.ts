import { PatientEmergencyContact } from "./patient.emergency.contact";
import { PatientEmployment } from "./patient.employment";
import { PatientName } from "./patient.name";
import { PatientPhone } from "./patient.phone";
import { PatientAddress } from "./patienta.ddress";

export interface PatientEssentialInformation {
    patientName?: PatientName;
    dateOfBirth?: number;
    birthDate_date?:Date;
    gender?: string;
    patientPhone?: PatientPhone;
    email?: string;
    patientAddress?: PatientAddress;
    maritalStatus?: string;
    patientEmergencyContact?: PatientEmergencyContact;
    patientEmployment?: PatientEmployment;
  }