import { MedicareCoverage } from "./medicare.coverage";
import { PatientRelationship } from "./patient.relationship";
import { SecondaryInsurance } from "./secondary.Insurance";

export class WrokerNotComp {
    insuranceCompanyName: string = '';
    memberId: string;
    policyId: string;
    relationship: string =''
    isSecondaryInsurance: boolean;
    isMedicareCoverage: boolean |undefined;
    insuranceCompanyId: string ='';
    secondaryInsuranceDTO: SecondaryInsurance | undefined
    medicareCoverageDTO: MedicareCoverage | undefined
    patientRelationshipDTO: PatientRelationship | undefined

}