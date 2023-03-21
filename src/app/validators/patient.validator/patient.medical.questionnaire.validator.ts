
import * as _ from 'lodash';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';


export class PatientMedicalQuestionnaireValidator {
    medicalQuestionnaireInfo: MedicalQuestionnaireInfo = new MedicalQuestionnaireInfo();
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;

    }
    public setModel(medicalQuestionnaireInfo: MedicalQuestionnaireInfo) {
        this.medicalQuestionnaireInfo = medicalQuestionnaireInfo;
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
    private validateRecommendationDoctor(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.recommendationDoctor !== undefined) {
            if (this.isRequiredField('name-recommendeddoctor')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.name === '' || this.medicalQuestionnaireInfo.recommendationDoctor.name === undefined)
                    validator.push({ property: " Recommendation Doctor name", message: '' });
            }
            if (this.isRequiredField('npi-recommendeddoctor')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.npi === '' || this.medicalQuestionnaireInfo.recommendationDoctor.npi === undefined)
                    validator.push({ property: " Recommendation Doctor NPI", message: '' });
            }
            if (this.isRequiredField('fax-recommendeddoctor')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.fax === '' || this.medicalQuestionnaireInfo.recommendationDoctor.fax === undefined)
                    validator.push({ property: " Recommendation Doctor Fax", message: '' });
            }
            if (this.isRequiredField('address-recommendeddoctor')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.fax === '' || this.medicalQuestionnaireInfo.recommendationDoctor.fax === undefined)
                    validator.push({ property: " Recommendation Doctor Address", message: '' });
            }
        }
    }

    private validateRecommendationEntity(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.recommendationEntity !== undefined) {
            if (this.isRequiredField('name-recommendedentity')) {
                if (this.medicalQuestionnaireInfo.recommendationEntity.name === '' || this.medicalQuestionnaireInfo.recommendationEntity.name === undefined)
                    validator.push({ property: " Recommendation Entity Name", message: '' });
            }
        }
    }

    private validatephysicalTherapyReceiving(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.physicalTherapy !== undefined) {
            if (this.isRequiredField('physicaltherapy-where')) {
                if (this.medicalQuestionnaireInfo.physicalTherapy.location === '' || this.medicalQuestionnaireInfo.physicalTherapy.location === undefined)
                    validator.push({ property: "Location of physical therapy", message: '' });
            }
            if (this.isRequiredField('physicaltherapy-number-visit')) {
                if (this.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit === 0 || this.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit === undefined)
                    validator.push({ property: "Number of visits of physical therapy", message: '' });
            }
        }
    }
    private validateInfo(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.isDoctorRecommended)
            this.validateRecommendationDoctor(validator);
        else
            this.validateRecommendationEntity(validator);
        if (this.medicalQuestionnaireInfo.physicalTherapyReceiving)
            this.validatephysicalTherapyReceiving(validator);

        if (this.isRequiredField('appointmentbooking')) {
            if (this.medicalQuestionnaireInfo.appointmentBooking === '' || this.medicalQuestionnaireInfo.appointmentBooking === undefined)
                validator.push({ property: "Appointment Booking", message: '' });
        }
        if (this.isRequiredField('primarydoctor')) {
            if (this.medicalQuestionnaireInfo.appointmentBooking === '' || this.medicalQuestionnaireInfo.appointmentBooking === undefined)
                validator.push({ property: "Number of visits of physical therapy", message: '' });
        }
    }

    isRequiredField(name: string): boolean {
        var field = _.find(requiredFields, { field: name })
        return field !== undefined ? field.required : false;
    }

}