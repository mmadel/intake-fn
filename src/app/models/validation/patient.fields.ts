import { AddressInfoRequired } from "./address.info.required";
import { BasicInfoRequired } from "./basic.info";
import { MedicalHistoryInfoRequired } from "./medical.history.info.required";
import { MedicalInfoRequired } from "./medical.info.required";


export class PatientRequiredFields {
    id: number | null
    basicInfo: BasicInfoRequired;
    addressInfoRequired: AddressInfoRequired;
    medicalInfoRequired: MedicalInfoRequired;
    medicalHistoryInfoRequired: MedicalHistoryInfoRequired;

}