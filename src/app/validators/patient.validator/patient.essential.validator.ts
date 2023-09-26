
import * as _ from 'lodash';
import { EssentialInformation } from 'src/app/models/validation/new/essential.information';
import { PatientEssentialInformation } from 'src/app/modules/patient.questionnaire/models/intake/essential/patient.essential.information';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';
import { PatientValidator } from './patient.validator';


export class PatientEssentialValidator extends PatientValidator {
    pateintBasicInfo: PatientEssentialInformation;
    requiredFields: EssentialInformation;
    constructor(requiredFields: EssentialInformation, pateintBasicInfo: PatientEssentialInformation) {
        super();
        this.pateintBasicInfo = pateintBasicInfo
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
        var validators: PropertyValidator[] = new Array();
        // if ((this.pateintBasicInfo.id_effective_from_date > this.pateintBasicInfo.id_effective_to_date)) {
        //     validators.push({ property: " ID Effective Date", message: "From Date Can\'t be greater than to Date" });
        // }
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.wrong.push(validator)
            });
        }
    }
    protected validateInfo(validator: PropertyValidator[]) {
        //if (this.isRequiredField('firstName'))
            if (this.pateintBasicInfo.patientName?.firstName === '' || this.pateintBasicInfo.patientName?.firstName === undefined)
                validator.push({ property: " First Name", message: '' });
        if (this.isRequiredField('middleName'))
            if (this.pateintBasicInfo.patientName?.middleName === '' || this.pateintBasicInfo.patientName?.middleName === undefined)
                validator.push({ property: " Middle Name", message: '' });
        //if (this.isRequiredField('lastName'))
            if (this.pateintBasicInfo.patientName?.lastName === '' || this.pateintBasicInfo.patientName?.lastName === undefined)
                validator.push({ property: " Last Name", message: '' });

        //if (this.isRequiredField('birthDate')) {
            if (this.pateintBasicInfo.dateOfBirth === undefined)
                validator.push({ property: " Birth Date", message: '' });
        //}
        //if (this.isRequiredField('gender')) {
            if (this.pateintBasicInfo.gender === '' || this.pateintBasicInfo.gender === undefined)
                validator.push({ property: " Gender", message: '' });
        //}
        //if (this.isRequiredField('maritalStatus')) {

            if (this.pateintBasicInfo.maritalStatus === '' || this.pateintBasicInfo.maritalStatus === undefined)
                validator.push({ property: " Marital Status", message: '' });
        //}

        //if (this.isRequiredField('phone') || this.isRequiredField('phone')) {
            if ((this.pateintBasicInfo.patientPhone?.phoneType === '' || this.pateintBasicInfo.patientPhone?.phoneType === undefined)
                && (this.pateintBasicInfo.patientPhone?.phone === '' || this.pateintBasicInfo.patientPhone?.phone === undefined)) {
                validator.push({ property: " Phone Type", message: '' });
                validator.push({ property: " Phone Number", message: '' });
            }
        //}
        if (this.isRequiredField('email')) {
            if (this.pateintBasicInfo.email === '' || this.pateintBasicInfo.email === undefined)
                validator.push({ property: " Email ", message: '' });
        }
        if (this.isRequiredField('emergencyContact') && this.isRequiredField('emergencyContact')) {
            if ((this.pateintBasicInfo.patientEmergencyContact?.emergencyName === '' || this.pateintBasicInfo.patientEmergencyContact?.emergencyName === undefined) &&
                (this.pateintBasicInfo.patientEmergencyContact?.emergencyPhone === '' || this.pateintBasicInfo.patientEmergencyContact?.emergencyPhone === undefined)) {
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