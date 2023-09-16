import { createAction, props } from "@ngrx/store";
import { Patient } from "../models/intake/patient";

export const CreateToDoAction = createAction(
    '[Patient] - Create Patient',
    props<Patient>()
  );