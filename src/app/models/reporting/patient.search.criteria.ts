export class PatientSearchCriteria {
    type: string |null;
    entityNames: string[];
    doctorName: string | null;
    doctorNPI: string |null;
    startDate_date: Date | null;
    endDate_date: Date | null;
    startDate: number;
    endDate: number;
}