import { GenderContainer } from "./gender.container";
import { PatientSourceContainer } from "./patient.source.container";

export interface DashboardDataContainer {
    totalNumberOfPatient: number;
    totalNumberOfCompensationNoFaultPatient: number;
    totalNumberOfCommercialPatient: number;
    genderContainer: GenderContainer;
    patientSourceContainer: PatientSourceContainer;
}