import { PatientConditions } from "../../../components/medical.history.information/create.patient.conditions/patient.conditions";
import { IPatientCondition } from "../../../components/medical.history.information/patient.condition";

export interface PatientMedicalHistory {
    height?: string;
    heightUnit?: string;
    weight?: string;
    weightUnit?: string;
    evaluationSubmission?: string;
    medicationPrescription?: string;
    patientCondition?: IPatientCondition[];
    scanningTest?: boolean;
    scanningTestValue?: string[];
    metalImplantation?: boolean;
    pacemaker?: boolean;
    surgeriesList?: string;
  }