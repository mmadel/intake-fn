import { FormGroup, Validators } from "@angular/forms";
import { CommercialFields } from "./commercial.fields";
import { CommercialMedicareCoverageFields } from "./commercial.medicare.coverage.fields";
import { CommercialPolicyHolderFields } from "./commercial.ploicy.holder.fields";
import { CommercialSecondaryInsuranceFields } from "./commercial.secondary.insurance.fields";

export class AddCommercialValidators {
    public static add(form: FormGroup) {
        for (var i = 0; i < CommercialFields.length; i++) {
            form.get('insurance')?.get(CommercialFields[i])?.setValidators(Validators.required)
            form.get('insurance')?.get(CommercialFields[i])?.updateValueAndValidity();
        }
        form.get('insurance')?.get('commercial-is-secondary-insurance')?.valueChanges.subscribe(value => {
            if (value)
                this.addSecondaryInsuranceValidators(form)
            else
                this.removeSecondaryInsuranceValidators(form)
        })
        form.get('insurance')?.get('commercial-ploicyHolder-relationship')?.valueChanges.subscribe(value => {
            if (value !== 'Self')
                this.addploicyHolderRelationshipValidators(form);
            if (value === 'Self')
                this.removeploicyHolderRelationshipValidators(form);
        })
        form.get('insurance')?.get('commercial-is-medicare-coverage')?.valueChanges.subscribe(value => {
            if (value)
                this.addMedicareCoverageValidators(form);
            else
                this.removeMedicareCoverageValidators(form);
        })
    }

    private static addSecondaryInsuranceValidators(form: FormGroup) {
        for (var i = 0; i < CommercialSecondaryInsuranceFields.length; i++) {
            form.get('insurance')?.get(CommercialSecondaryInsuranceFields[i])?.setValidators(Validators.required)
            form.get('insurance')?.get(CommercialSecondaryInsuranceFields[i])?.updateValueAndValidity();
        }
    }
    private static removeSecondaryInsuranceValidators(form: FormGroup) {
        for (var i = 0; i < CommercialSecondaryInsuranceFields.length; i++) {
            form.get('insurance')?.get(CommercialSecondaryInsuranceFields[i])?.clearValidators();
            form.get('insurance')?.get(CommercialSecondaryInsuranceFields[i])?.setErrors(null);
            form.get('insurance')?.get(CommercialSecondaryInsuranceFields[i])?.updateValueAndValidity();
        }
    }

    private static addMedicareCoverageValidators(form: FormGroup) {
        for (var i = 0; i < CommercialMedicareCoverageFields.length; i++) {
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.setValidators(Validators.required)
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.updateValueAndValidity();
        }
    }

    private static removeMedicareCoverageValidators(form: FormGroup) {
        for (var i = 0; i < CommercialMedicareCoverageFields.length; i++) {
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.clearValidators();
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.setErrors(null);
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.updateValueAndValidity();
        }
    }

    private static addploicyHolderRelationshipValidators(form: FormGroup) {
        for (var i = 0; i < CommercialPolicyHolderFields.length; i++) {
            form.get('insurance')?.get(CommercialPolicyHolderFields[i])?.setValidators(Validators.required)
            form.get('insurance')?.get(CommercialPolicyHolderFields[i])?.updateValueAndValidity();
        }
    }
    private static removeploicyHolderRelationshipValidators(form: FormGroup) {
        for (var i = 0; i < CommercialPolicyHolderFields.length; i++) {
            form.get('insurance')?.get(CommercialPolicyHolderFields[i])?.clearValidators();
            form.get('insurance')?.get(CommercialPolicyHolderFields[i])?.setErrors(null);
            form.get('insurance')?.get(CommercialPolicyHolderFields[i])?.updateValueAndValidity();
        }
    }
}