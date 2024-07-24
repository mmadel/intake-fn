import { FormGroup } from "@angular/forms";
import { CommercialMedicareCoverageFields } from "./commercial.medicare.coverage.fields";

export class RemoveCommercialMedicareCoverageValidator{
    public static remove(form: FormGroup){
        for (var i = 0; i < CommercialMedicareCoverageFields.length; i++) {
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.clearValidators();
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.setErrors(null);
            form.get('insurance')?.get(CommercialMedicareCoverageFields[i])?.updateValueAndValidity();
        }
    }
}