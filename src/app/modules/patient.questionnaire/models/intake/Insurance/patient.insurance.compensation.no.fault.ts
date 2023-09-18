import { Address } from "src/app/models/patient/address.info.model";

export interface PatientInsuranceCompensationNoFault {
  injuryType?: string;
  accidentDate?: number;
  accidentDate_date?: Date;
  workerStatus?: string;
  fax?: string;
  address?: Address;
  insuranceName?: string;
  claimNumber?: string;
  adjusterInfoName?: string;
  adjusterInfoPhone?: string;
  attorneyInfoName?: string;
  attorneyInfoPhone?: string;
  caseStatus?: string;
}