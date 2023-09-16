import { Relation } from "../../enums/emergency.relation";

export interface PatientGrantor {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    relation?: Relation;
    idFront?: number[];
    idBack?: number[];
  }