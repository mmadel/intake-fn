import { EmergencyRelation } from "src/app/modules/patient.questionnaire/models/patient/emergency.relation";

export class PatientGrantorModel {
    id: number;
    firstName: number;
    middleName: number;
    lastName: number;
    relation:EmergencyRelation;
    files: FormData = new FormData();
    // idFront: FormData;
    // idBack: FormData 
}