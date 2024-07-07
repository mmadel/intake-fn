import { FormGroup } from "@angular/forms";

export class InsuranceValidator {
    public static addValidator(form: FormGroup) {
        if (!form.get('insurance')?.get('type')?.value) {
            console.log('add worker compansation validators ')
            console.log('remove commercial validators')
        }
        if (form.get('insurance')?.get('type')?.value) {
            console.log('add commercial validators ')
            console.log('remove worker compansation validators ')
        }
    }
}