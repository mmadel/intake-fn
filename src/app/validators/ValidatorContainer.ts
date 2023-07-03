import { PropertyValidator } from './PropertyValidator';

export class ValidatorContainer {
    isValid: boolean = true;
    missing: PropertyValidator[] = new Array();
    wrong: PropertyValidator[] = new Array();
}