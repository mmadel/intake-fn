import { FormGroup, Validators } from "@angular/forms";
import { CompensationFields } from "./compensation.fields";

export class AddWorkerCompensationValidators {
    public static add(form: FormGroup) {
        for (var i = 0; i < CompensationFields.length; i++) {
            form.get('insurance')?.get(CompensationFields[i])?.setValidators(Validators.required)
            form.get('insurance')?.get(CompensationFields[i])?.updateValueAndValidity();
        }
    }
}