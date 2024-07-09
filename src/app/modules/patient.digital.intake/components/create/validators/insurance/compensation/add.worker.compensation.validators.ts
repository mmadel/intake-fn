import { FormGroup, Validators } from "@angular/forms";
import { CompensationFields } from "./compensation.fields";

export class AddWorkerCompensationValidators {
    public static add(form: FormGroup) {
        const phoneRgx = new RegExp("^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)][-\s\.]?[0-9]{4,6}$");
        const zipCodeRgx = new RegExp("^\\d{5}(?:[-\s]\\d{4})?$");
        for (var i = 0; i < CompensationFields.length; i++) {
            console.log(CompensationFields[i])
            form.get('insurance')?.get(CompensationFields[i])?.setValidators(Validators.required)
            if (CompensationFields[i] === 'compensation-phone'
                || CompensationFields[i] === 'compensation-fax'
                || CompensationFields[i] === 'compensation-adjuster-phone'
                || CompensationFields[i] === 'compensation-attorney-phone') {
                form.get('insurance')?.get(CompensationFields[i])?.setValidators([Validators.required, Validators.pattern(phoneRgx)])
            }
            if (CompensationFields[i] === 'compensation-zipcode') {
                form.get('insurance')?.get(CompensationFields[i])?.setValidators([Validators.required, Validators.min(10), Validators.pattern(zipCodeRgx)])
            }
            form.get('insurance')?.get(CompensationFields[i])?.updateValueAndValidity();
        }
    }
}