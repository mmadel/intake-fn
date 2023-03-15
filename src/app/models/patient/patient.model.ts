import { InsuranceQuestionnaireInfo } from "../questionnaire/insurance.questionnaire.info";
import { MedicalQuestionnaireInfo } from "../questionnaire/medical.questionnaire.info";
import { MedicalHistroyInformation } from "../questionnaire/medical/history/medical.history.info";
import { Address } from "./address.info.model";
import { Agreements } from "./agreements/agreements.model";
import { Basic } from "./basic.info.model";

export class Patient {
    basicInfo: Basic = new Basic();
    addressInfo: Address = new Address();
    medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
    insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    medicalHistroyInformation: MedicalHistroyInformation = new MedicalHistroyInformation();
    agreements:Agreements= new Agreements();
}