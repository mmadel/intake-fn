
import * as _ from 'lodash';
import * as moment from 'moment';
import { Basic } from 'src/app/models/patient/basic.info.model';
import { BasicInfoRequired } from 'src/app/models/validation/basic.info';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';
import { PatientValidator } from './patient.validator';


export class PatientEssentialValidator extends PatientValidator {
    pateintBasicInfo: Basic;
    requiredFields: BasicInfoRequired;
    constructor(requiredFields: BasicInfoRequired, pateintBasicInfo: Basic) {
        super();
        this.pateintBasicInfo = pateintBasicInfo
        this.requiredFields = requiredFields;
    }


    private formatDate() {
        this.pateintBasicInfo.birthDate = Number(moment(this.pateintBasicInfo.birthDate_date).format("x"));
        this.pateintBasicInfo.idEffectiveFrom = Number(moment(this.pateintBasicInfo.id_effective_from_date).format("x"))
        this.pateintBasicInfo.idEffectiveTo = Number(moment(this.pateintBasicInfo.id_effective_to_date).format("x"))
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
    protected validateInfo(validator: PropertyValidator[]) {
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
            if (this.pateintBasicInfo.gender === '' || this.pateintBasicInfo.gender === undefined)
                validator.push({ property: " Gender", message: '' });
        }
        if (this.isRequiredField('maritalStatus')) {

            if (this.pateintBasicInfo.maritalStatus === '' || this.pateintBasicInfo.maritalStatus === undefined)
                validator.push({ property: " Marital Status", message: '' });
        }

        if (this.isRequiredField('phone') || this.isRequiredField('phone')) {
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
        if (this.isRequiredField('patientId') && this.isRequiredField('patientId')) {
            if ((this.pateintBasicInfo.idType === '' || this.pateintBasicInfo.idType === undefined) &&
                (this.pateintBasicInfo.patientId === '' || this.pateintBasicInfo.patientId === undefined)) {
                validator.push({ property: " ID Type", message: '' });
                validator.push({ property: "ID", message: '' });
            }
        }
        if (this.isRequiredField('patientId') && this.isRequiredField('patientId')) {
            if ((Number.isNaN(this.pateintBasicInfo.idEffectiveFrom)) &&
                (Number.isNaN(this.pateintBasicInfo.idEffectiveTo))) {
                validator.push({ property: "Id effective From", message: '' });
                validator.push({ property: "Id effective To", message: '' });
            }
        }
        if (this.isRequiredField('emergencyContact') && this.isRequiredField('emergencyContact')) {
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