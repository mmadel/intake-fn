import { FormGroup } from "@angular/forms";
import { AddWorkerCompensationValidators } from "./compensation/add.worker.compensation.validators";
import { RemoveWorkerCompensationValidators } from "./compensation/remove.worker.compensation.validators";

export class InsuranceValidator {
    public static addValidator(form: FormGroup) {
        AddWorkerCompensationValidators.add(form)
        form.get('insurance')?.get('type')?.valueChanges.subscribe((value: any) => {
            if (!value) {
                //add worker compansation validators 
                AddWorkerCompensationValidators.add(form)
                console.log('remove commercial validators')
            }
            if (value) {
                console.log('add commercial validators ')
                //remove worker compansation validators
                RemoveWorkerCompensationValidators.remove(form)
            }
        })
    }
}