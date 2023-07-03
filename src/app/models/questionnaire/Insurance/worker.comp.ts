import { Address } from "../../patient/address.info.model";

export class WrokerComp {
    injuryType: string = "";
    accidentDate_date: Date;
    accidentDate: number;
    workerStatus: string = '';
    workerCompAddress: Address;
    fax: string;
    insuranceName: string;
    claimNumber: number;
    adjusterInfoName: string;
    adjusterInfoPhone: string='';
    attorneyInfoName: string;
    attorneyInfoPhone: string='';
    caseStatus: string = '';
}