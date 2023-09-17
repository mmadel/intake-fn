import { createAction, props } from "@ngrx/store";
import { Patient } from "../models/intake/patient";

export const CreateDependency = createAction(
  '[Patient] - Create Patient',
  props<{ patientDependency: Patient; }>()
);