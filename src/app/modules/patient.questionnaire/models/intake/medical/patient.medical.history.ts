export interface PatientMedicalHistory {
    height?: string;
    heightUnit?: string;
    weight?: string;
    weightUnit?: string;
    evaluationSubmission?: string;
    medicationPrescription?: string;
    patientCondition?: string[];
    scanningTest?: boolean;
    scanningTestValue?: string;
    metalImplantation?: boolean;
    pacemaker?: boolean;
    surgeriesList?: string;
  }