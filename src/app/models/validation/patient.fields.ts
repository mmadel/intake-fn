import { AddressInfoRequired } from "./address.info.required";
import { BasicInfoRequired } from "./basic.info";
import { InsurnacecommerialInfoRequired } from "./insurnace.commerial.info.required";
import { InsurnaceCompInfoRequired } from "./insurnace.comp.info.required";
import { MedicalHistoryInfoRequired } from "./medical.history.info.required";
import { MedicalInfoRequired } from "./medical.info.required";


export class PatientRequiredFields {
    id: number | null
    basicInfo: BasicInfoRequired;
    addressInfoRequired: AddressInfoRequired;
    medicalInfoRequired: MedicalInfoRequired;
    medicalHistoryInfoRequired: MedicalHistoryInfoRequired;
    insurnaceCompInfoRequired:InsurnaceCompInfoRequired;
    insurnacecommerialInfoRequired:InsurnacecommerialInfoRequired

}