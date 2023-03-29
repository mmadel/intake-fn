export class PatientSearchCriteria {
    type: string = "";
    entityNames: string[];
    doctorName: string | null;
    doctorNPI: string;
    startDate_date: Date | null;
    endDate_date: Date | null;
    startDate: number;
    endDate: number;
}