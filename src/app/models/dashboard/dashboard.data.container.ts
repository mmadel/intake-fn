import { GenderContainer } from "./gender.container";
import { PatientSourceContainer } from "./patient.source.container";
import { WeekCounterContainer } from "./week.counter.container";

export interface DashboardDataContainer {
    totalNumberOfPatient: number;
    totalNumberOfCompensationNoFaultPatient: number;
    totalNumberOfCommercialPatient: number;
    genderContainer: GenderContainer;
    patientSourceContainer: PatientSourceContainer;
    weekCounterContainer: WeekCounterContainer;
    clinicsData: Map<string, number[]>
}