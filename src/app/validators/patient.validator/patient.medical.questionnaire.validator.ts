
import * as _ from 'lodash';
import { MedicalQuestionnaireInfo } from 'src/app/models/questionnaire/medical.questionnaire.info';
import { MedicalInfoRequired } from 'src/app/models/validation/medical.info.required';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';
import { PatientValidator } from './patient.validator';


export class PatientMedicalQuestionnaireValidator extends PatientValidator {
    medicalQuestionnaireInfo: MedicalQuestionnaireInfo;
    requiredFields: MedicalInfoRequired;

    constructor(medicalQuestionnaireInfo: MedicalQuestionnaireInfo,
        requiredFields: MedicalInfoRequired) {
        super();
        this.medicalQuestionnaireInfo = medicalQuestionnaireInfo;
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
    private validateRecommendationDoctor(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.recommendationDoctor !== undefined) {
            if (this.isRequiredField('recommendedDoctorName')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.name === '' || this.medicalQuestionnaireInfo.recommendationDoctor.name === undefined)
                    validator.push({ property: " Recommendation Doctor name", message: '' });
            }
            if (this.isRequiredField('recommendedDoctorNpi')) {
                if (this.medicalQuestionnaireInfo.recommendationDoctor.npi === '' || this.medicalQuestionnaireInfo.recommendationDoctor.npi === undefined)
                    validator.push({ property: " Recommendation Doctor NPI", message: '' });
            }
            // if (this.isRequiredField('recommendedDoctorFax')) {
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.fax === '' || this.medicalQuestionnaireInfo.recommendationDoctor.fax === undefined)
            //         validator.push({ property: " Recommendation Doctor Fax", message: '' });
            // }
            // if (this.isRequiredField('recommendedDoctorAddress')) {
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.type === '' || this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.type === undefined)
            //         validator.push({ property: " Recommendation Doctor Address Type", message: '' });
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.first === '' || this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.first === undefined)
            //         validator.push({ property: " Recommendation Doctor Address first ", message: '' });
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.second === '' || this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.second === undefined)
            //         validator.push({ property: " Recommendation Doctor Address second ", message: '' });
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.country === '' || this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.country === undefined)
            //         validator.push({ property: " Recommendation Doctor Address country ", message: '' });
            //     if (this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.zipCode === '' || this.medicalQuestionnaireInfo.recommendationDoctor.doctorAddress?.zipCode === undefined)
            //         validator.push({ property: " Recommendation Doctor Address zipCode ", message: '' });
            // }
        }
    }

    private validateRecommendationEntity(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.recommendationEntity !== undefined) {
            if (this.isRequiredField('recommendedEntityName')) {
                if (this.medicalQuestionnaireInfo.recommendationEntity.name === '' || this.medicalQuestionnaireInfo.recommendationEntity.name === undefined)
                    validator.push({ property: " Recommendation Entity Name", message: '' });
            }
        }
    }

    private validatephysicalTherapyReceiving(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.physicalTherapy !== undefined) {
            if (this.isRequiredField('physicalTherapyLocation')) {
                if (this.medicalQuestionnaireInfo.physicalTherapy.location === '' || this.medicalQuestionnaireInfo.physicalTherapy.location === undefined)
                    validator.push({ property: "Location of physical therapy", message: '' });
            }
            if (this.isRequiredField('physicalTherapyNumberOfVisit')) {
                if (this.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit === 0 || this.medicalQuestionnaireInfo.physicalTherapy.numberOfVisit === undefined)
                    validator.push({ property: "Number of visits of physical therapy", message: '' });
            }
        }
    }
    protected validateInfo(validator: PropertyValidator[]) {
        if (this.medicalQuestionnaireInfo.isDoctorRecommended)
            this.validateRecommendationDoctor(validator);
        else
            this.validateRecommendationEntity(validator);
        if (this.medicalQuestionnaireInfo.physicalTherapyReceiving)
            this.validatephysicalTherapyReceiving(validator);

        if (this.isRequiredField('recommendation')) {
            console.log(this.medicalQuestionnaireInfo.recommendationDoctor === null)
            if (this.medicalQuestionnaireInfo.recommendationDoctor === null || this.medicalQuestionnaireInfo.recommendationEntity === null)
                validator.push({ property: "Answer : Did the doctor recommend us or referred you to us", message: '' });

        }

        if (this.isRequiredField('appointmentBooking')) {
            if (this.medicalQuestionnaireInfo.appointmentBooking === '' || this.medicalQuestionnaireInfo.appointmentBooking === undefined)
                validator.push({ property: "Appointment Booking", message: '' });
        }
        if (this.isRequiredField('primaryDoctor')) {
            if (this.medicalQuestionnaireInfo.primaryDoctor === '' || this.medicalQuestionnaireInfo.primaryDoctor === undefined)
                validator.push({ property: "Primary Doctor", message: '' });
        }
        if (this.isRequiredField('resultSubmissionFamily')) {
            if (this.medicalQuestionnaireInfo.familyResultSubmission === undefined)
                validator.push({ property: "Answer : Would you like your results sent to your family doctor?", message: '' });
        }
        if (this.isRequiredField('physicalTherapy')) {
            if (this.medicalQuestionnaireInfo.physicalTherapyReceiving === undefined)
                validator.push({ property: "Answer : Have you received physical therapy this year somewhere else?", message: '' });
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