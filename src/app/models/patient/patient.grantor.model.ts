import { EmergencyRelation } from "src/app/modules/patient.questionnaire/models/patient/emergency.relation";

export class PateintGrantorModel {
    id: number;
    firstName: number;
    middleName: number;
    lastName: number;
    relation:EmergencyRelation;
    idFront: FormData;
    idBack: FormData 
}