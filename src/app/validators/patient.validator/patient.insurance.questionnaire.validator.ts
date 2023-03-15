import * as _ from "lodash";
import { InsuranceQuestionnaireInfo } from "src/app/models/questionnaire/insurance.questionnaire.info";
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";
export class PatientInsuranceQuestionnaireValidator {
    model: InsuranceQuestionnaireInfo
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;

    }

    public setModel(model: InsuranceQuestionnaireInfo) {
        this.model = model;
    }

    private validateInfo(validator: PropertyValidator[]) {
        if (this.model.isWrokerComp === null || this.model.isWrokerComp === undefined)
            validator.push({ property: "worker's comp/No fault", message: '' });
        else if (this.model.isWrokerComp) {
            this.validateWrokerComp(validator)
        }
        else {
            this.validateWrokerNotComp(validator)
        }

    }

    private validateWrokerComp(validator: PropertyValidator[]) {
        if (this.model.wrokerCompModel.injuryType === 'workingInjury')
            this.validateworkingInjury(validator);
        if (this.model.wrokerCompModel.injuryType === 'autoAccident')
            this.validateAutoAccident(validator);
        if (this.model.wrokerCompModel.injuryType === '')
            validator.push({ property: "Worker Related Injury/Auto-Accident", message: '' });
    }

    private validateWrokerNotComp(validator: PropertyValidator[]) {
        if (this.isRequiredField('insuranceCompanyName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.insuranceCompanyName === '' || this.model.WrokerNotCompModel.insuranceCompanyName === undefined)
                validator.push({ property: "Insurance Company", message: '' });
        }
        if (this.isRequiredField('memberId-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.memberId === '' || this.model.WrokerNotCompModel.memberId === undefined)
                validator.push({ property: "Member ID", message: '' });
        }
        if (this.isRequiredField('ploicyId-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.ploicyId === '' || this.model.WrokerNotCompModel.ploicyId === undefined)
                validator.push({ property: "Ploicy ID", message: '' });
        }
        if (this.isRequiredField('policyRelationship-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.policyRelationship === '' || this.model.WrokerNotCompModel.policyRelationship === undefined)
                validator.push({ property: "Policyholders Relationship", message: '' });
        }
        if (this.model.WrokerNotCompModel.policyRelationship !== 'Self') {
            if (this.isRequiredField('policyRelationshipFirstName-wrokernotcomp')) {
                if (this.model.WrokerNotCompModel.policyRelationshipFirstName === '' || this.model.WrokerNotCompModel.policyRelationshipFirstName === undefined)
                    validator.push({ property: "Policy Holder’s First Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipMiddleName-wrokernotcomp')) {
                if (this.model.WrokerNotCompModel.policyRelationshipMiddleName === '' || this.model.WrokerNotCompModel.policyRelationshipMiddleName === undefined)
                    validator.push({ property: "Policy Holder’s Middle Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipLastName-wrokernotcomp')) {
                if (this.model.WrokerNotCompModel.policyRelationshipLastName === '' || this.model.WrokerNotCompModel.policyRelationshipLastName === undefined)
                    validator.push({ property: "Policy Holder’s Last Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipPhone-wrokernotcomp')) {
                if (this.model.WrokerNotCompModel.policyRelationshipPhone === '' || this.model.WrokerNotCompModel.policyRelationshipPhone === undefined)
                    validator.push({ property: "Policy Holder’s Phone", message: '' });
            }
            if (this.isRequiredField('policyRelationshipEmployerName-wrokernotcomp')) {
                if (this.model.WrokerNotCompModel.policyRelationshipEmployerName === '' || this.model.WrokerNotCompModel.policyRelationshipEmployerName === undefined)
                    validator.push({ property: "Policy Holder’s Employer Name", message: '' });
            }
        }
        if (this.model.WrokerNotCompModel.secondaryInsurance === null || this.model.WrokerNotCompModel.secondaryInsurance === undefined) {
            validator.push({ property: "Secondary Insurance", message: '' });
        }
        if (this.model.WrokerNotCompModel.secondaryInsurance)
            this.validateSecondaryInsurance(validator)
    }

    private validateSecondaryInsurance(validator: PropertyValidator[]) {
        if (this.isRequiredField('secondaryInsuranceMemberId-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsuranceMemberId === '' || this.model.WrokerNotCompModel.secondaryInsuranceMemberId === undefined)
                validator.push({ property: "Secondary Insurance Member ID", message: '' });
        }
        if (this.isRequiredField('secondaryInsuranceCompanyName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsuranceCompanyName === '' || this.model.WrokerNotCompModel.secondaryInsuranceCompanyName === undefined)
                validator.push({ property: "Secondary Insurance Company", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderFirstName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderFirstName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderFirstName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder FirstName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderMiddleName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderMiddleName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderMiddleName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder MiddleName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderLastName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderLastName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderLastName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder LastName", message: '' });
        }
        if (this.model.WrokerNotCompModel.medicareCoverage === null || this.model.WrokerNotCompModel.medicareCoverage === undefined)
            validator.push({ property: "Medicare Coverage", message: '' });
        if (this.model.WrokerNotCompModel.medicareCoverage)
            this.validateMedicareCoverage(validator)
    }

    private validateMedicareCoverage(validator: PropertyValidator[]) {

        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerFirstName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerFirstName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerFirstName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer FirstName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerMiddleName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerMiddleName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerMiddleName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer MiddleName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerLastName-wrokernotcomp')) {
            if (this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerLastName === '' || this.model.WrokerNotCompModel.secondaryInsurancePolicyHolderEmployerLastName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer LastName", message: '' });
        }
    }
    private validateworkingInjury(validator: PropertyValidator[]) {
        if (this.isRequiredField('accidentDate-wrokercomp')) {
            if (Number.isNaN(this.model.wrokerCompModel.accidentDateTimeStamp) || this.model.wrokerCompModel.accidentDateTimeStamp === 0)
                validator.push({ property: " Accident Date", message: '' });
        }
        if (this.isRequiredField('wrokerStatus-wrokercomp')) {
            if (this.model.wrokerCompModel.wrokerStatus === '' || this.model.wrokerCompModel.wrokerStatus === undefined)
                validator.push({ property: " Wroker Status", message: '' });
        }
        if (this.isRequiredField('address-wrokercomp')) {
            if (this.model.wrokerCompModel.address === '' || this.model.wrokerCompModel.address === undefined)
                validator.push({ property: " Address", message: '' });
        }
        if (this.isRequiredField('fax-wrokercomp')) {
            if (this.model.wrokerCompModel.fax === '' || this.model.wrokerCompModel.fax === undefined)
                validator.push({ property: " Fax", message: '' });
        }
        if (this.isRequiredField('insuranceName-wrokercomp')) {
            if (this.model.wrokerCompModel.insuranceName === '' || this.model.wrokerCompModel.insuranceName === undefined)
                validator.push({ property: " Insurance Name", message: '' });
        }
        if (this.isRequiredField('claimNumber-wrokercomp')) {
            if (this.model.wrokerCompModel.claimNumber === 0 || this.model.wrokerCompModel.claimNumber === undefined)
                validator.push({ property: "Claim Number/ WC Case Number", message: '' });
        }
        if (this.isRequiredField('adjusterInfoName-wrokercomp')) {
            if (this.model.wrokerCompModel.adjusterInfoName === '' || this.model.wrokerCompModel.adjusterInfoName === undefined)
                validator.push({ property: "Adjuster Name", message: '' });
        }
        if (this.isRequiredField('adjusterInfoPhone-wrokercomp')) {
            if (this.model.wrokerCompModel.adjusterInfoPhone === '' || this.model.wrokerCompModel.adjusterInfoPhone === undefined)
                validator.push({ property: "Adjuster Phone", message: '' });
        }
        if (this.isRequiredField('attorneyInfoName-wrokercomp')) {
            if (this.model.wrokerCompModel.attorneyInfoName === '' || this.model.wrokerCompModel.attorneyInfoName === undefined)
                validator.push({ property: "Attorney Name", message: '' });
        }
        if (this.isRequiredField('attorneyInfoPhone-wrokercomp')) {
            if (this.model.wrokerCompModel.attorneyInfoPhone === '' || this.model.wrokerCompModel.attorneyInfoPhone === undefined)
                validator.push({ property: "Attorney Phone", message: '' });
        }
        if (this.isRequiredField('caseStatus-wrokercomp')) {
            if (this.model.wrokerCompModel.caseStatus === '' || this.model.wrokerCompModel.caseStatus === undefined)
                validator.push({ property: "Case Status", message: '' });
        }
    }

    private validateAutoAccident(validator: PropertyValidator[]) {
        if (this.isRequiredField('accidentDate-wrokercomp')) {
            if (Number.isNaN(this.model.wrokerCompModel.accidentDateTimeStamp))
                validator.push({ property: " Accident Date", message: '' });
        }
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
    isRequiredField(name: string): boolean {
        var field = _.find(requiredFields, { field: name })
        return field !== undefined ? field.required : false;
    }

}