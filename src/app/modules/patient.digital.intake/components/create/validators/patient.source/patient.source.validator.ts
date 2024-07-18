import { FormGroup } from "@angular/forms";
import { AddEntityValidator } from "./entity/add.entity.validator";
import { RemoveEntityValidator } from "./entity/remove.entity.validator";
import { AddProviderSourceValidator } from "./provider/add.provider.validator";
import { RemoveProviderValidator } from "./provider/remove.provider.validator";

export class PatientSourceValidator {
    public static addValidator(form: FormGroup) {
        form.get('medical')?.get('isReferring')?.valueChanges.subscribe(value => {
            if (value === 'yes') {
                AddProviderSourceValidator.add(form);
                RemoveEntityValidator.remove(form)
            }
            if (value === 'no') {
                AddEntityValidator.add(form)
                RemoveProviderValidator.remove(form)
            }
        })
    }
}