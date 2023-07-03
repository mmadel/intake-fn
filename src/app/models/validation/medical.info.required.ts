export interface MedicalInfoRequired {
    id: number | null
    recommendation: boolean;
    recommendedDoctorName: boolean;
    recommendedDoctorNpi: boolean;
    recommendedDoctorFax: boolean;
    recommendedDoctorAddress: boolean;
    recommendedEntityName: boolean;
    physicalTherapy: boolean
    physicalTherapyLocation: boolean
    physicalTherapyNumberOfVisit: boolean
    appointmentBooking: boolean;
    resultSubmissionFamily: boolean;
    primaryDoctor: boolean;

}