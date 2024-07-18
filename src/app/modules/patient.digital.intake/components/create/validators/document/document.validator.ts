import { FormGroup } from "@angular/forms";
import * as moment from "moment";
import { AddGuarantorValidator } from "./guarantor.validator/add.guarantor.validator";
import { RemoveGuarantorValidator } from "./guarantor.validator/remove.guarantor.validator";
import { AddPatientValidator } from "./patient.validator/add.patient.validator";
import { RemovePatientValidator } from "./patient.validator/remove.patient.validator";

export class DocumentValidator {
    public static addValidator(form: FormGroup) {
        form.get('basic')?.get('dob')?.valueChanges.subscribe(value => {
            var patientAge = moment().diff(value, 'y')
            var isGuarantor: boolean = patientAge < 21 ? true : false;
            if (isGuarantor) {
                AddGuarantorValidator.add(form);
                RemovePatientValidator.remove(form)
            }
            else {
                AddPatientValidator.add(form);
                RemoveGuarantorValidator.remove(form)
            }
        })
    }
}