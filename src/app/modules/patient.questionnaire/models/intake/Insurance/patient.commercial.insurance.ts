import { MedicareCoverage } from "./medicare.coverage";
import { PatientRelationship } from "./patient.relationship";
import { SecondaryInsurance } from "./secondary.insurance";

export interface PatientCommercialInsurance {
    insuranceCompanyId: number;
    memberId: string;
    policyId: string;
    relationship: string;
    secondaryInsurance: SecondaryInsurance;
    medicareCoverage: MedicareCoverage;
    patientRelationship: PatientRelationship;
  }