import { EmergencyRelation } from "src/app/modules/patient.questionnaire/models/patient/emergency.relation";

export class PateintGrantorModel {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    relation:EmergencyRelation;
    files: FormData =  new FormData()
}