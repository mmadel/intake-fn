
import * as _ from 'lodash'
import { Basic } from 'src/app/models/patient/basic.info.model';
import { PropertyValidator } from '../PropertyValidator';
import { ValidatorContainer } from '../ValidatorContainer';
import requiredFields from '../../modules/patient.questionnaire/service/_patient.require.fields.service';
import { Address } from 'src/app/models/patient/address.info.model';


export class PatientAddressValidator {
    pateintAddressInfo: Address = new Address();
    public validate(): ValidatorContainer {
        var validatorContainer: ValidatorContainer = { isValid: true, missing: new Array(), wrong: new Array() }
        this.missingFields(validatorContainer)
        this.inCorrectDate(validatorContainer);
        return validatorContainer;

    }
    public setModel(pateintAddressInfo: Address) {
        this.pateintAddressInfo = pateintAddressInfo;
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
    private missingFields(validatorContainer: ValidatorContainer) {
        var validators: PropertyValidator[] = new Array();
        this.validateInfo(validators);
        if (validators.length > 0) {
            validatorContainer.isValid = false;
            _.forEach(validators, validator => {
                validatorContainer.missing.push(validator)
            });
        }
    }

    private inCorrectDate(validatorContainer: ValidatorContainer) {
        
    }
    private validateInfo(validator: PropertyValidator[]) {
        if (this.isRequiredField('addresstype')) {
            if (this.pateintAddressInfo.type === '' || this.pateintAddressInfo.type === undefined)
                validator.push({ property: " Address Type", message: '' });
        }
        if (this.isRequiredField('firstaddress')) {
            if (this.pateintAddressInfo.first === null || this.pateintAddressInfo.first === undefined)
                validator.push({ property: "First Address", message: '' });
        }
        if (this.isRequiredField('secondaddress')) {

            if (this.pateintAddressInfo.second === '' || this.pateintAddressInfo.second === undefined)
                validator.push({ property: "First Address", message: '' });
        }

        if (this.isRequiredField('country')) {
            if ((this.pateintAddressInfo.country === '' || this.pateintAddressInfo.country === undefined)) {
                validator.push({ property: " Country", message: '' });
            }
        }
        if (this.isRequiredField('zipcode')) {
            if (this.pateintAddressInfo.zipCode === '' || this.pateintAddressInfo.zipCode === undefined)
                validator.push({ property: " Email ", message: '' });
        }
    }

    isRequiredField(name: string): boolean {
        var field = _.find(requiredFields, { field: name })
        return field !== undefined ? field.required : false;
    }

}