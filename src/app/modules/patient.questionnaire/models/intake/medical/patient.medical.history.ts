export interface PatientMedicalHistory {
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    evaluationSubmission: string;
    medicationPrescription: string;
    patientCondition: string;
    scanningTest: boolean;
    scanningTestValue: string;
    metalImplantation: boolean;
    pacemaker: boolean;
    surgeriesList: string;
  }