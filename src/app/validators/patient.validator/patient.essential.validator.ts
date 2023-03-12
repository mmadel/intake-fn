
import * as _ from 'lodash'
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';


export class PatientEssentialValidator {
    pateintBasicInfo: Basic = new Basic();
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;

    }
    public setModel(pateintBasicInfo: Basic) {
        this.pateintBasicInfo = pateintBasicInfo;
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
        var validators: PropertyValidator[] = new Array();
        if ((this.pateintBasicInfo.id_effective_from_date > this.pateintBasicInfo.id_effective_to_date)) {
            validators.push({ property: " ID Effective Date", message: "From Date Can\'t be greater than to Date" });
        }
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.wrong.push(validator)
            });
        }
    }
    private validateInfo(validator: PropertyValidator[]) {
        if (this.isRequiredField('name')) {
            if (this.pateintBasicInfo.firstName === '' || this.pateintBasicInfo.firstName === undefined)
                validator.push({ property: " First Name", message: '' });
            if (this.pateintBasicInfo.middleName === '' || this.pateintBasicInfo.middleName === undefined)
                validator.push({ property: " Middle Name", message: '' });
            if (this.pateintBasicInfo.lastName === '' || this.pateintBasicInfo.lastName === undefined)
                validator.push({ property: " Last Name", message: '' });
        }
        if (this.isRequiredField('birthDate')) {
            if (Number.isNaN(this.pateintBasicInfo.birthDate))
                validator.push({ property: " Birth Date", message: '' });
        }
        if (this.isRequiredField('gender')) {
            if (this.pateintBasicInfo.geneder === null || this.pateintBasicInfo.geneder === undefined)
                validator.push({ property: " Gender", message: '' });
        }
        if (this.isRequiredField('maritalStatus')) {

            if (this.pateintBasicInfo.maritalStatus === '' || this.pateintBasicInfo.maritalStatus === undefined)
                validator.push({ property: " Marital Status", message: '' });
        }

        if (this.isRequiredField('phoneType') && this.isRequiredField('phoneNumber')) {
            if ((this.pateintBasicInfo.phoneType === '' || this.pateintBasicInfo.phoneType === undefined)
                && (this.pateintBasicInfo.phoneNumber === '' || this.pateintBasicInfo.phoneNumber === undefined)) {
                validator.push({ property: " Phone Type", message: '' });
                validator.push({ property: " Phone Number", message: '' });
            }
        }
        if (this.isRequiredField('email')) {
            if (this.pateintBasicInfo.email === '' || this.pateintBasicInfo.email === undefined)
                validator.push({ property: " Email ", message: '' });
        }
        if (this.isRequiredField('idType') && this.isRequiredField('id')) {
            if ((this.pateintBasicInfo.idType === '' || this.pateintBasicInfo.idType === undefined) &&
                (this.pateintBasicInfo.id === '' || this.pateintBasicInfo.id === undefined)) {
                validator.push({ property: " ID Type", message: '' });
                validator.push({ property: "ID", message: '' });
            }
        }
        if (this.isRequiredField('ideffective_from') && this.isRequiredField('ideffective_to')) {
            if ((Number.isNaN(this.pateintBasicInfo.ideffective_from)) &&
                (Number.isNaN(this.pateintBasicInfo.ideffective_to))) {
                validator.push({ property: "Id effective From", message: '' });
                validator.push({ property: "Id effective To", message: '' });
            }
        }
        if (this.isRequiredField('emergencyName') && this.isRequiredField('emergencyPhone')) {
            if ((this.pateintBasicInfo.emergencyName === '' || this.pateintBasicInfo.emergencyName === undefined) &&
                (this.pateintBasicInfo.emergencyPhone === '' || this.pateintBasicInfo.emergencyPhone === undefined)) {
                validator.push({ property: "Emergency Name", message: '' });
                validator.push({ property: "Emergency Phone", message: '' });
            }
        }
        if (this.isRequiredField('employmentStatus')) {
            validator.push({ property: "Employment Status", message: '' });
        }
    }

    isRequiredField(name: string): boolean {
        var field = _.find(requiredFields, { field: name })
        return field !== undefined ? field.required : false;
    }

}