import * as moment from "moment";
import { Address } from "src/app/models/patient/address.info.model";
import { Basic } from "src/app/models/patient/basic.info.model";
import { Patient } from "src/app/models/patient/patient.model";
import { InsuranceQuestionnaireInfo } from "src/app/models/questionnaire/insurance.questionnaire.info";
import { MedicalQuestionnaireInfo } from "src/app/models/questionnaire/medical.questionnaire.info";
import { ValidatorContainer } from "../ValidatorContainer";
import { PatientAddressValidator } from "./patient.address.validator";
import { PatientEssentialValidator } from "./patient.essential.validator";
import { PatientInsuranceQuestionnaireValidator } from "./patient.insurance.questionnaire.validator";
import { PatientMedicalQuestionnaireValidator } from "./patient.medical.questionnaire.validator";

export class PatientValidator {
    private patientEssentialInfo: Basic = new Basic();
    private patientAddressInfo: Address = new Address();
    private insuranceQuestionnaireInfo: InsuranceQuestionnaireInfo = new InsuranceQuestionnaireInfo();
    private medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
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
            }
            if (modelName === 'address') {
                this.patientAddressInfo = JSON.parse(model);
                var patientAddressValidator: PatientAddressValidator = new PatientAddressValidator();
                patientAddressValidator.setModel(this.patientAddressInfo);
                this.validator = new ValidatorContainer();
                this.validator = patientAddressValidator.validate();
            }
            if (modelName === 'medical') {
                this.medicalQuestionnaireInfo = JSON.parse(model);
                var patientMedicalQuestionnaireValidator: PatientMedicalQuestionnaireValidator = new PatientMedicalQuestionnaireValidator();
                patientMedicalQuestionnaireValidator.setModel(this.medicalQuestionnaireInfo);
                this.validator = new ValidatorContainer();
                this.validator = patientMedicalQuestionnaireValidator.validate();
            }
            if (modelName === 'insurance') {
                this.insuranceQuestionnaireInfo = JSON.parse(model);
                var patientInsuranceQuestionnaireValidator: PatientInsuranceQuestionnaireValidator = new PatientInsuranceQuestionnaireValidator();
                patientInsuranceQuestionnaireValidator.setModel(this.insuranceQuestionnaireInfo)
                this.validator = new ValidatorContainer();
                this.validator = patientInsuranceQuestionnaireValidator.validate();
            }
        }
        return this.validator;
    }
}