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
        if (this.model.isCompNoFault === null || this.model.isCompNoFault === undefined)
            validator.push({ property: "worker's comp/No fault", message: '' });
        else if (this.model.isCompNoFault) {
            this.validateWrokerComp(validator)
        }
        else {
            this.validateWrokerNotComp(validator)
        }

    }

    private validateWrokerComp(validator: PropertyValidator[]) {
        if (this.model.insuranceWorkerCompNoFault?.injuryType === 'workingInjury')
            this.validateworkingInjury(validator);
        if (this.model.insuranceWorkerCompNoFault?.injuryType === 'autoAccident')
            this.validateAutoAccident(validator);
        if (this.model.insuranceWorkerCompNoFault?.injuryType === '')
            validator.push({ property: "Worker Related Injury/Auto-Accident", message: '' });
    }

    private validateWrokerNotComp(validator: PropertyValidator[]) {
        if (this.isRequiredField('insuranceCompanyName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.insuranceCompanyId === '' || this.model.insuranceWorkerCommercial?.insuranceCompanyId === undefined)
                validator.push({ property: "Insurance Company", message: '' });
        }
        if (this.isRequiredField('memberId-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.memberId === '' || this.model.insuranceWorkerCommercial?.memberId === undefined)
                validator.push({ property: "Member ID", message: '' });
        }
        if (this.isRequiredField('ploicyId-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.policyId === '' || this.model.insuranceWorkerCommercial?.policyId === undefined)
                validator.push({ property: "Ploicy ID", message: '' });
        }
        if (this.isRequiredField('policyRelationship-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.relationship === '' || this.model.insuranceWorkerCommercial?.relationship === undefined)
                validator.push({ property: "Policyholders Relationship", message: '' });
        }
        if (this.model.insuranceWorkerCommercial?.relationship !== 'Self') {
            if (this.isRequiredField('policyRelationshipFirstName-wrokernotcomp')) {
                if (this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipFirstName === '' || this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipFirstName === undefined)
                    validator.push({ property: "Policy Holder’s First Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipMiddleName-wrokernotcomp')) {
                if (this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipMeddileName === '' || this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipMeddileName === undefined)
                    validator.push({ property: "Policy Holder’s Middle Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipLastName-wrokernotcomp')) {
                if (this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipLastName === '' || this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipLastName === undefined)
                    validator.push({ property: "Policy Holder’s Last Name", message: '' });
            }
            if (this.isRequiredField('policyRelationshipPhone-wrokernotcomp')) {
                if (this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone === '' || this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone === undefined)
                    validator.push({ property: "Policy Holder’s Phone", message: '' });
            }
            if (this.isRequiredField('policyRelationshipEmployerName-wrokernotcomp')) {
                if (this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone === '' || this.model.insuranceWorkerCommercial?.patientRelationshipDTO?.patientRelationshipPhone === undefined)
                    validator.push({ property: "Policy Holder’s Employer Name", message: '' });
            }
        }

        if (this.model.insuranceWorkerCommercial?.isSecondaryInsurance)
            this.validateSecondaryInsurance(validator)
    }

    private validateSecondaryInsurance(validator: PropertyValidator[]) {
        // if (this.isRequiredField('secondaryInsuranceMemberId-wrokernotcomp')) {
        //     if (this.model.insuranceWorkerCommercial.secondaryInsuranceDTO. === '' || this.model.WrokerNotCompModel.secondaryInsuranceMemberId === undefined)
        //         validator.push({ property: "Secondary Insurance Member ID", message: '' });
        // }
        // if (this.isRequiredField('secondaryInsuranceCompanyName-wrokernotcomp')) {
        //     if (this.model.WrokerNotCompModel.secondaryInsuranceCompanyName === '' || this.model.WrokerNotCompModel.secondaryInsuranceCompanyName === undefined)
        //         validator.push({ property: "Secondary Insurance Company", message: '' });
        // }
        if (this.isRequiredField('secondaryInsurancePolicyHolderFirstName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderFirstName === '' || this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderFirstName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder FirstName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderMiddleName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderMeddileName === '' || this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderMeddileName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder MiddleName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderLastName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderLastName === '' || this.model.insuranceWorkerCommercial?.secondaryInsuranceDTO?.policyHolderLastName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder LastName", message: '' });
        }

        if (this.model.insuranceWorkerCommercial?.isMedicareCoverage !== undefined && this.model.insuranceWorkerCommercial.isMedicareCoverage)
            this.validateMedicareCoverage(validator)
    }

    private validateMedicareCoverage(validator: PropertyValidator[]) {

        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerFirstName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerFirstName === '' || this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerFirstName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer FirstName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerMiddleName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerMeddileName === '' || this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerMeddileName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer MiddleName", message: '' });
        }
        if (this.isRequiredField('secondaryInsurancePolicyHolderEmployerLastName-wrokernotcomp')) {
            if (this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerLastName === '' || this.model.insuranceWorkerCommercial?.medicareCoverageDTO?.employerLastName === undefined)
                validator.push({ property: "Secondary Insurance PolicyHolder Employer LastName", message: '' });
        }
    }
    private validateworkingInjury(validator: PropertyValidator[]) {
        if (this.isRequiredField('accidentDate-wrokercomp')) {
            if (Number.isNaN(this.model.insuranceWorkerCompNoFault?.accidentDateTimeStamp) || this.model.insuranceWorkerCompNoFault?.accidentDateTimeStamp === 0)
                validator.push({ property: " Accident Date", message: '' });
        }
        if (this.isRequiredField('wrokerStatus-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.wrokerStatus === '' || this.model.insuranceWorkerCompNoFault?.wrokerStatus === undefined)
                validator.push({ property: " Wroker Status", message: '' });
        }
        if (this.isRequiredField('address-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.address === '' || this.model.insuranceWorkerCompNoFault?.address === undefined)
                validator.push({ property: " Address", message: '' });
        }
        if (this.isRequiredField('fax-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.fax === '' || this.model.insuranceWorkerCompNoFault?.fax === undefined)
                validator.push({ property: " Fax", message: '' });
        }
        if (this.isRequiredField('insuranceName-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.insuranceName === '' || this.model.insuranceWorkerCompNoFault?.insuranceName === undefined)
                validator.push({ property: " Insurance Name", message: '' });
        }
        if (this.isRequiredField('claimNumber-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.claimNumber === 0 || this.model.insuranceWorkerCompNoFault?.claimNumber === undefined)
                validator.push({ property: "Claim Number/ WC Case Number", message: '' });
        }
        if (this.isRequiredField('adjusterInfoName-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.adjusterInfoName === '' || this.model.insuranceWorkerCompNoFault?.adjusterInfoName === undefined)
                validator.push({ property: "Adjuster Name", message: '' });
        }
        if (this.isRequiredField('adjusterInfoPhone-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.adjusterInfoPhone === '' || this.model.insuranceWorkerCompNoFault?.adjusterInfoPhone === undefined)
                validator.push({ property: "Adjuster Phone", message: '' });
        }
        if (this.isRequiredField('attorneyInfoName-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.attorneyInfoName === '' || this.model.insuranceWorkerCompNoFault?.attorneyInfoName === undefined)
                validator.push({ property: "Attorney Name", message: '' });
        }
        if (this.isRequiredField('attorneyInfoPhone-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.attorneyInfoPhone === '' || this.model.insuranceWorkerCompNoFault?.attorneyInfoPhone === undefined)
                validator.push({ property: "Attorney Phone", message: '' });
        }
        if (this.isRequiredField('caseStatus-wrokercomp')) {
            if (this.model.insuranceWorkerCompNoFault?.caseStatus === '' || this.model.insuranceWorkerCompNoFault?.caseStatus === undefined)
                validator.push({ property: "Case Status", message: '' });
        }
    }

    private validateAutoAccident(validator: PropertyValidator[]) {
        if (this.isRequiredField('accidentDate-wrokercomp')) {
            if (Number.isNaN(this.model.insuranceWorkerCompNoFault?.accidentDateTimeStamp))
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