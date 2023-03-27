import * as _ from "lodash";
import { MedicalHistroyInformation } from "src/app/models/questionnaire/medical/history/medical.history.info";
import { MedicalHistoryInfoRequired } from "src/app/models/validation/medical.history.info.required";
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";
import { PatientValidator } from "./patient.validator";
export class MdicalHistoryValidator extends PatientValidator {
    model: MedicalHistroyInformation;
    requiredFields: MedicalHistoryInfoRequired;
    constructor(model: MedicalHistroyInformation, requiredFields: MedicalHistoryInfoRequired) {
        super();
        this.model = model;
        this.requiredFields = requiredFields;
    }

    protected missingFields(validatorContainer: ValidatorContainer) {
        var validators: PropertyValidator[] = new Array();
        this.validateInfo(validators);
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.missing.push(validator)
            });
        }
    }

    protected inCorrectDate(validatorContainer: ValidatorContainer) {

    }
    protected validateInfo(validator: PropertyValidator[]) {
        if (this.isRequiredField('height')) {
            if (this.model.height === '' || this.model.height === undefined)
                validator.push({ property: "Height", message: '' });
        }
        if (this.isRequiredField('weight')) {
            if (this.model.weight === '' || this.model.weight === undefined)
                validator.push({ property: "Weight", message: '' });
        }
        if (this.isRequiredField('evaluationReason')) {
            if (this.model.evaluationReason === '' || this.model.evaluationReason === undefined)
                validator.push({ property: "What is your primary reason for today’s evaluation", message: '' });
        }
        if (this.isRequiredField('medicationPrescription')) {
            if (this.model.medicationPrescription === '' || this.model.medicationPrescription === undefined)
                validator.push({ property: "Please list any prescription or non-prescription medication you are taking", message: '' });
        }

        if (this.isRequiredField('patientCondition')) {
            if (this.model.patientCondition === undefined)
                validator.push({ property: "Please select each condition that you have been", message: '' });
            else if (this.model.patientCondition.length < 1)
                validator.push({ property: "Please select each condition that you have been", message: '' });

        }
        if (this.isRequiredField('scanningTest')) {
            if (this.model.scanningTest === undefined)
                validator.push({ property: "Please Select : MRI , CT Or X-Ray", message: '' });

            else if (this.model.scanningTestValue === '' || this.model.scanningTestValue === undefined)
                validator.push({ property: "MRI , CT Or X-Ray Values", message: '' });
        }

        if (this.isRequiredField('metalImplantation')) {
            if (this.model.metalImplantation === undefined)
                validator.push({ property: "Please Select : Metal Implants", message: '' });
        }
        if (this.isRequiredField('pacemaker')) {
            if (this.model.pacemaker === undefined)
                validator.push({ property: "Please Select : Pacemaker", message: '' });
        }
        if (this.isRequiredField('surgeriesList')) {
            if (this.model.surgeriesList === '' || this.model.surgeriesList === undefined)
                validator.push({ property: "Please Select : list any Surgeries you may have had ", message: '' });
        }
    }
    isRequiredField(name: string): boolean {
        var field: boolean = false;
        Object.entries(this.requiredFields)
            .forEach(([key, value]) => {
                if (key === name) {
                    field = value;
                }
            })
        return field;
    }
}