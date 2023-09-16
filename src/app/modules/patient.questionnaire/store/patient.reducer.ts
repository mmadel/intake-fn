import { Action, createReducer, on } from "@ngrx/store";
import { Patient } from "../models/intake/patient";
import * as PatientActions from './patient.action';
import { initializeState, PatientState } from "./patient.state";

const initialState = initializeState();
const reducer = createReducer(
    initialState,
    on(PatientActions.CreateToDoAction,
        (state: PatientState, { patient }) =>
        ({
            ...state,
            patients: [...state.patients, patient]
        }))
)
export function Patientreducer(state: PatientState | undefined, action: Action): any {
    return Patientreducer(state, action);
}