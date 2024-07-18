import { FormGroup } from "@angular/forms";
import { AddCommercialValidators } from "./commercial/add.commercial.validator";
import { RemoveCommercialValidators } from "./commercial/remove.commercial.validator";
import { AddWorkerCompensationValidators } from "./compensation/add.worker.compensation.validators";
import { RemoveWorkerCompensationValidators } from "./compensation/remove.worker.compensation.validators";

export class InsuranceValidator {
    public static addValidator(form: FormGroup) {
        AddWorkerCompensationValidators.add(form)
        form.get('insurance')?.get('type')?.valueChanges.subscribe((value: any) => {
            if (!value) {
                //add worker compansation validators 
                AddWorkerCompensationValidators.add(form)
                //remove worker commercial validators
                RemoveCommercialValidators.remove(form)
            }
            if (value) {
                //add commercial validators
                AddCommercialValidators.add(form);
                //remove worker compansation validators
                RemoveWorkerCompensationValidators.remove(form)
            }
        })
    }
}