import * as _ from "lodash";
import { Agreements } from "src/app/models/patient/agreements/agreements.model";
import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";

export class PatientAggreementsValidator {
    model: Agreements = new Agreements();
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;
    }
    public setModel(model: Agreements) {
        this.model = model;
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
        if (!this.model.acceptReleaseAgreements)
            validator.push({ property: "Release of Information", message: '' });
        if (!this.model.acceptFinancialResponsibilityAgreements)
            validator.push({ property: "Financial Responsibility Agreement by Other than Patient’s Legal Representative", message: '' });
        if (!this.model.acceptFinancialAgreementAgreements)
            validator.push({ property: "Financial Agreement", message: '' });
        if (!this.model.acceptInsuranceAgreement)
            validator.push({ property: "Assignment of Insurance Beneﬁts", message: '' });
        if (!this.model.acceptHIPAAAgreements)
            validator.push({ property: "HIPAA Acknowledgement", message: '' });
        if (!this.model.acceptCuppingAgreements)
            validator.push({ property: "Cupping Consent Form", message: '' });
        if (!this.model.acceptPelvicAgreements)
            validator.push({ property: "Pelvic Examination & Treatment Consent Form", message: '' });
        if (!this.model.acceptPhotoVideoAgreements )
            validator.push({ property: "Photo/Video Release Form", message: '' });
    }
}