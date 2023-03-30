import * as _ from "lodash";
import { InsuranceQuestionnaireInfo } from "src/app/models/questionnaire/insurance.questionnaire.info";
import { InsurnacecommerialInfoRequired } from "src/app/models/validation/insurnace.commerial.info.required";
import { InsurnaceCompInfoRequired } from "src/app/models/validation/insurnace.comp.info.required";
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";
import { PatientValidator } from "./patient.validator";
export class PatientInsuranceQuestionnaireValidator extends PatientValidator {
    model: InsuranceQuestionnaireInfo
    insurnaceCompInfoRequired: InsurnaceCompInfoRequired;
    InsurnacecommerialInfoRequired: InsurnacecommerialInfoRequired;
    constructor(model: InsuranceQuestionnaireInfo
        , insurnaceCompInfoRequired: InsurnaceCompInfoRequired
        , InsurnacecommerialInfoRequired: InsurnacecommerialInfoRequired) {
        super();
        this.model = model;
        this.insurnaceCompInfoRequired = insurnaceCompInfoRequired;
        this.InsurnacecommerialInfoRequired = InsurnacecommerialInfoRequired;
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
    protected inCorrectDate(validatorContainer: ValidatorContainer): void {

    }
    protected validateInfo(validator: PropertyValidator[]): void {
        if (this.model.isCompNoFault === null || this.model.isCompNoFault === undefined)
            validator.push({ property: "worker's comp/No fault", message: '' });
        else if (this.model.isCompNoFault) {
            this.validateWrokerComp(validator)
        }
        else {
            this.validateWrokerNotComp(validator)
        }
    }
    protected isRequiredField(name: string): boolean {
        var field: boolean = false;
        Object.entries(this.model.isCompNoFault ? this.insurnaceCompInfoRequired : this.InsurnacecommerialInfoRequired)
            .forEach(([key, value]) => {
                if (key === name) {
                    field = value;
                }
            })
        return field;
    }
    private validateWrokerComp(validator: PropertyValidator[]) {
        console.log('ddd ' + this.model.insuranceWorkerCompNoFault?.injuryType)
        if (this.isRequiredField('relatedInjury')) {
            if (this.model.insuranceWorkerCompNoFault?.injuryType === '' || this.model.insuranceWorkerCompNoFault?.injuryType === undefined)
                validator.push({ property: " Injury Type", message: '' });
        }
        if (this.isRequiredField('accidentDate')) {
            if (Number.isNaN(this.model.insuranceWorkerCompNoFault?.accidentDate_date) || this.model.insuranceWorkerCompNoFault?.accidentDate === 0)
                validator.push({ property: " Accident Date", message: '' });
        }
        if (this.isRequiredField('workerStatus')) {
            if (this.model.insuranceWorkerCompNoFault?.workerStatus === '' || this.model.insuranceWorkerCompNoFault?.workerStatus === undefined)
                validator.push({ property: " Wroker Status", message: '' });
        }
        if (this.isRequiredField('address')) {
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.first === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.first === undefined)
                validator.push({ property: "First Address ", message: '' });
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.second === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.second === undefined)
                validator.push({ property: "Second Address", message: '' });
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.type === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.type === undefined)
                validator.push({ property: "Address Type", message: '' });
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.country === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.country === undefined)
                validator.push({ property: "Address country", message: '' });
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.city === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.city === undefined)
                validator.push({ property: "Address city", message: '' });
            if (this.model.insuranceWorkerCompNoFault?.workerCompAddress.zipCode === '' || this.model.insuranceWorkerCompNoFault?.workerCompAddress.zipCode === undefined)
                validator.push({ property: "Address zipCode", message: '' });
        }
        if (this.isRequiredField('fax')) {
            if (this.model.insuranceWorkerCompNoFault?.fax === '' || this.model.insuranceWorkerCompNoFault?.fax === undefined)
                validator.push({ property: " Fax", message: '' });
        }
        if (this.isRequiredField('insuranceName')) {
            if (this.model.insuranceWorkerCompNoFault?.insuranceName === '' || this.model.insuranceWorkerCompNoFault?.insuranceName === undefined)
                validator.push({ property: " Insurance Name", message: '' });
        }
        if (this.isRequiredField('claimNumber')) {
            if (this.model.insuranceWorkerCompNoFault?.claimNumber === 0 || this.model.insuranceWorkerCompNoFault?.claimNumber === undefined)
                validator.push({ property: "Claim Number/ WC Case Number", message: '' });
        }
        if (this.isRequiredField('adjusterName')) {
            if (this.model.insuranceWorkerCompNoFault?.adjusterInfoName === '' || this.model.insuranceWorkerCompNoFault?.adjusterInfoName === undefined)
                validator.push({ property: "Adjuster Name", message: '' });
        }
        if (this.isRequiredField('adjusterPhone')) {
            if (this.model.insuranceWorkerCompNoFault?.adjusterInfoPhone === '' || this.model.insuranceWorkerCompNoFault?.adjusterInfoPhone === undefined)
                validator.push({ property: "Adjuster Phone", message: '' });
        }
        if (this.isRequiredField('attorneyName')) {
            if (this.model.insuranceWorkerCompNoFault?.attorneyInfoName === '' || this.model.insuranceWorkerCompNoFault?.attorneyInfoName === undefined)
                validator.push({ property: "Attorney Name", message: '' });
        }
        if (this.isRequiredField('attorneyPhone')) {
            if (this.model.insuranceWorkerCompNoFault?.attorneyInfoPhone === '' || this.model.insuranceWorkerCompNoFault?.attorneyInfoPhone === undefined)
                validator.push({ property: "Attorney Phone", message: '' });
        }
        if (this.isRequiredField('caseStatus')) {
            if (this.model.insuranceWorkerCompNoFault?.caseStatus === '' || this.model.insuranceWorkerCompNoFault?.caseStatus === undefined)
                validator.push({ property: "Case Status", message: '' });
        }
    }

    private validateWrokerNotComp(validator: PropertyValidator[]) {
        if (this.isRequiredField('insuranceCompany')) {
            if (this.model.insuranceWorkerCommercial?.insuranceCompanyId === '' || this.model.insuranceWorkerCommercial?.insuranceCompanyId === undefined)
                validator.push({ property: "Insurance Company", message: '' });
        }
        if (this.isRequiredField('memberId')) {
            if (this.model.insuranceWorkerCommercial?.memberId === '' || this.model.insuranceWorkerCommercial?.memberId === undefined)
                validator.push({ property: "Member ID", message: '' });
        }
        if (this.isRequiredField('ploicyId')) {
            if (this.model.insuranceWorkerCommercial?.policyId === '' || this.model.insuranceWorkerCommercial?.policyId === undefined)
                validator.push({ property: "Ploicy ID", message: '' });
        }
        if (this.isRequiredField('relationship')) {
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
    }

}