import { AddressInfoRequired } from "./address.info.required";
import { BasicInfoRequired } from "./basic.info";
import { MedicalInfoRequired } from "./medical.info.required";


export class PatientRequiredFields {
    id: number
    basicInfo: BasicInfoRequired;
    addressInfoRequired: AddressInfoRequired;
    medicalInfoRequired:MedicalInfoRequired;

}