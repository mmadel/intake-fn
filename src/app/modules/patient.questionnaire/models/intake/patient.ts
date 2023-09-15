interface Patient {
    id: number;
    patientEssentialInformation?: PatientEssentialInformation;
    patientMedical?: PatientMedical;
    patientInsurance?: PatientInsurance;
    patientGrantor?: PatientGrantor;
    patientSource?: PatientSource;
    patientSignature?: PatientSignature;
    patientAgreements?: PatientAgreement[];
  }