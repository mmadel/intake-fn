import { Address } from "./address.info.model";
import { Basic } from "./basic.info.model";
import { InsuranceQuestionnaireInfo } from "../questionnaire/insurance.questionnaire.info";
import { MedicalQuestionnaireInfo } from "../questionnaire/medical.questionnaire.info";

export class Patient {
    basicInfo: Basic = new Basic();
    addressInfo: Address = new Address();
    medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
    insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
}