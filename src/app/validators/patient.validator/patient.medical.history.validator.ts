import { MedicalHistroyInformation } from "src/app/models/questionnaire/medical/history/medical.history.info";
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';
import * as _ from "lodash";
export class MdicalHistoryValidator {
    model: MedicalHistroyInformation = new MedicalHistroyInformation();
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;
    }

    public setModel(model: MedicalHistroyInformation) {
        this.model = model;
    }
    public validatorAsHTML(validator: PropertyValidator[]): string {

        var html: string = "";
        for (var i = 0; i < validator.length; ++i) {
            html = html + validator[i].property;
            var msg: string = validator[i].message != '' ? validator[i].message : ''
            if (msg !== null)
                html = html + "<br>" + msg;
            html = html + "<br>"
        }
        return html;
    }
    private missingFields(validatorContainer: ValidatorContainer) {
        var validators: PropertyValidator[] = new Array();
        this.validateInfo(validators);
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.missing.push(validator)
            });
        }
    }

    private inCorrectDate(validatorContainer: ValidatorContainer) {

    }
    private validateInfo(validator: PropertyValidator[]) {
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
            if (this.model.patientCondition.length < 1  || this.model.patientCondition === undefined)
                validator.push({ property: "Please select each condition that you have been", message: '' });
        }
        if (this.isRequiredField('isScannig')) {
            if (this.model.isScannig === undefined)
                validator.push({ property: "Please Select : MRI , CT Or X-Ray", message: '' });

            else if (this.model.ScannigValue === '' || this.model.ScannigValue === undefined)
                validator.push({ property: "MRI , CT Or X-Ray Values", message: '' });
        }

        if (this.isRequiredField('isMetalImplantation')) {
            if (this.model.isMetalImplantation === undefined)
                validator.push({ property: "Please Select : Metal Implants", message: '' });
        }
        if (this.isRequiredField('isPacemaker')) {
            if (this.model.isPacemaker === undefined)
                validator.push({ property: "Please Select : Pacemaker", message: '' });
        }
        if (this.isRequiredField('surgeriesList')) {
            if (this.model.surgeriesList === '' || this.model.surgeriesList === undefined)
                validator.push({ property: "Please Select : list any Surgeries you may have had ", message: '' });
        }
    }
    isRequiredField(name: string): boolean {
        var field = _.find(requiredFields, { field: name })
        return field !== undefined ? field.required : false;
    }
}