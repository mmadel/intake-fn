import { FormGroup, Validators } from "@angular/forms";
import { noSpecialCharactersValidator } from "../custom.validation/special.characters.validator";
import { GuarantorFields } from "./guarantor.fields";

export class AddGuarantorValidators {
    public static add(form: FormGroup) {
        for (var i = 0; i < GuarantorFields.length; i++) {
            form.get('basic')?.get(GuarantorFields[i])?.setValidators([Validators.required,noSpecialCharactersValidator()])
            form.get('basic')?.get(GuarantorFields[i])?.updateValueAndValidity();
        }
        
    }
}