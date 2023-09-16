import { Patient } from "../models/intake/patient";


export class PatientState{
    Patient:Patient
    PatientError: Error | null;
}
export const initializeState = (): PatientState => {
    return { Patient: {}, PatientError: null };
  };
