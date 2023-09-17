import { Patient } from "../models/intake/patient";


export class PatientState {
    patientDependencies: Patient[]
}
export const initialState: PatientState = {
    patientDependencies: [] = []
};
