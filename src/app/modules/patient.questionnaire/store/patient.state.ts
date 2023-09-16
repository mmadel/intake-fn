import { Patient } from "../models/intake/patient";


export class PatientState {
    patients: Patient[]
    PatientError: Error | null;
}
export const initializeState = (): PatientState => {
    return { patients: [], PatientError: null };
};
