import { GenderContainer } from "./gender.container";
import { PatientSourceContainer } from "./patient.source.container";

export interface DashboardDataContainer {
    genderContainer: GenderContainer;
    patientSourceContainer: PatientSourceContainer;
}