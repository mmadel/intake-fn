import * as moment from "moment";
import { Address } from "src/app/models/patient/address.info.model";
import { Basic } from "src/app/models/patient/basic.info.model";
import { Patient } from "src/app/models/patient/patient.model";
import { InsuranceQuestionnaireInfo } from "src/app/models/questionnaire/insurance.questionnaire.info";
import { MedicalQuestionnaireInfo } from "src/app/models/questionnaire/medical.questionnaire.info";
import { MedicalHistroyInformation } from "src/app/models/questionnaire/medical/history/medical.history.info";
import { ValidatorContainer } from "../ValidatorContainer";
import { PatientAddressValidator } from "./patient.address.validator";
import { PatientEssentialValidator } from "./patient.essential.validator";
import { PatientInsuranceQuestionnaireValidator } from "./patient.insurance.questionnaire.validator";
import { MdicalHistoryValidator } from "./patient.medical.history.validator";
import { PatientMedicalQuestionnaireValidator } from "./patient.medical.questionnaire.validator";

export class PatientValidator {
    private patientEssentialInfo: Basic = new Basic();
    private patientAddressInfo: Address = new Address();
    private insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    private medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
    private medicalHistroyInformation: MedicalHistroyInformation = new MedicalHistroyInformation();
    private validator: ValidatorContainer = new ValidatorContainer();

    public validate(modelName: string, model: string, patient: Patient): ValidatorContainer {

        if (modelName !== '') {
            if (modelName === 'basic') {
                this.patientEssentialInfo = JSON.parse(model);
                var atientEssentialValidator: PatientEssentialValidator = new PatientEssentialValidator();
                this.patientEssentialInfo.birthDate = Number(moment(this.patientEssentialInfo.birthDate_date).format("x"));

                this.patientEssentialInfo.ideffective_from = Number(moment(this.patientEssentialInfo.id_effective_from_date).format("x"))
                this.patientEssentialInfo.ideffective_to = Number(moment(this.patientEssentialInfo.id_effective_to_date).format("x"))
                atientEssentialValidator.setModel(this.patientEssentialInfo);
                this.validator = new ValidatorContainer();
                this.validator = atientEssentialValidator.validate();
                if (this.validator)
                    patient.basicInfo = this.patientEssentialInfo
            }
            if (modelName === 'address') {
                this.patientAddressInfo = JSON.parse(model);
                var patientAddressValidator: PatientAddressValidator = new PatientAddressValidator();
                patientAddressValidator.setModel(this.patientAddressInfo);
                this.validator = new ValidatorContainer();
                this.validator = patientAddressValidator.validate();
                if (this.validator)
                    patient.addressInfo = this.patientAddressInfo
            }
            if (modelName === 'medical') {
                this.medicalQuestionnaireInfo = JSON.parse(model);
                var patientMedicalQuestionnaireValidator: PatientMedicalQuestionnaireValidator = new PatientMedicalQuestionnaireValidator();
                patientMedicalQuestionnaireValidator.setModel(this.medicalQuestionnaireInfo);
                this.validator = new ValidatorContainer();
                this.validator = patientMedicalQuestionnaireValidator.validate();
                if (this.validator)
                    patient.medicalQuestionnaireInfo = this.medicalQuestionnaireInfo
            }
            if (modelName === 'insurance') {
                this.insuranceQuestionnaireInfo = JSON.parse(model);
                this.insuranceQuestionnaireInfo.wrokerCompModel.accidentDateTimeStamp = Number(moment(this.insuranceQuestionnaireInfo.wrokerCompModel.accidentDate).format("x"));
                var patientInsuranceQuestionnaireValidator: PatientInsuranceQuestionnaireValidator = new PatientInsuranceQuestionnaireValidator();
                patientInsuranceQuestionnaireValidator.setModel(this.insuranceQuestionnaireInfo)
                this.validator = new ValidatorContainer();
                this.validator = patientInsuranceQuestionnaireValidator.validate();
                if (this.validator)
                    patient.insuranceQuestionnaireInfo = this.insuranceQuestionnaireInfo
            }
            if (modelName === 'medical-history') {
                this.medicalHistroyInformation = JSON.parse(model);
                var mdicalHistoryValidator: MdicalHistoryValidator = new MdicalHistoryValidator();
                mdicalHistoryValidator.setModel(this.medicalHistroyInformation)
                this.validator = new ValidatorContainer();
                this.validator = mdicalHistoryValidator.validate();
                if (this.validator)
                    patient.medicalHistroyInformation = this.medicalHistroyInformation
            }
        }
        return this.validator;
    }
}