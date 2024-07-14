import { FormGroup, Validators } from "@angular/forms";
import { GuarantorDocumentFields } from "./guarantor.document.fields";

export class AddGuarantorValidator {
    public static add(form: FormGroup) {
        for (var i = 0; i < GuarantorDocumentFields.length; i++) {
            form.get('document')?.get(GuarantorDocumentFields[i])?.setValidators(Validators.required)
            form.get('document')?.get(GuarantorDocumentFields[i])?.updateValueAndValidity();
        }
    }
}