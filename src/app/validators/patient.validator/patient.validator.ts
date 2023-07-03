import { PropertyValidator } from "../PropertyValidator";
import { ValidatorContainer } from "../ValidatorContainer";

export abstract class PatientValidator {
    
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;
    }
    public validatorAsHTML(validator: PropertyValidator[]): string {

        var html: string = "";
        for (var i = 0; i < validator.length; ++i) {
            html = html + validator[i].property;
            var msg: string = validator[i].message != '' ? validator[i].message : ''
            if (msg !== null)
                html = html + "<br>" + msg;
            html = html + "<br>"
        }
        return html;
    }
    protected abstract missingFields(validatorContainer: ValidatorContainer): void;
    protected abstract inCorrectDate(validatorContainer: ValidatorContainer): void;
    protected abstract validateInfo(validator: PropertyValidator[]): void;
    protected abstract isRequiredField(name: string): boolean

}