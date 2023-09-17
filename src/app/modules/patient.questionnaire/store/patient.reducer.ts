import { Action, createReducer, on } from "@ngrx/store";
import * as PateintActions from "./patient.action";
import { initialState, PatientState } from "./patient.state";

const reducers =  createReducer(
  initialState,
  on(PateintActions.CreateDependency, (state, { patientDependency }) => (
    {
    ...state,
    patientDependencies: [...state.patientDependencies, patientDependency],
  })),

)

export function Reducer(state: PatientState | undefined, action: Action) {
  return reducers(state, action);
}


