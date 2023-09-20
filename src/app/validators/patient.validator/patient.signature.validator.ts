import * as _ from "lodash";
import { PatientSignature } from "src/app/modules/patient.questionnaire/models/patient/signature.model";
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";
import { PatientValidator } from "./patient.validator";

export class PatientSignatureValidator extends PatientValidator {
    patientSignature: PatientSignature;
    constructor(patientSignature: PatientSignature) {
        super();
        this.patientSignature = patientSignature
    }
    protected missingFields(validatorContainer: ValidatorContainer): void {
        var validators: PropertyValidator[] = new Array();
        this.validateInfo(validators);
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.missing.push(validator)
            });
        }
    }
    protected inCorrectDate(validator: ValidatorContainer): void { }
    protected validateInfo(validator: PropertyValidator[]): void {
        console.log(this.patientSignature.signature)
        if (this.patientSignature.signature === null || this.patientSignature.signature === undefined)
            validator.push({ property: "Signature ", message: '' });
    }
    protected isRequiredField(name: string): boolean {return true;}

}