interface PatientCommercialInsurance {
    insuranceCompanyId: number;
    memberId: string;
    policyId: string;
    relationship: string;
    secondaryInsurance: SecondaryInsurance;
    medicareCoverage: MedicareCoverage;
    patientRelationship: PatientRelationship;
  }