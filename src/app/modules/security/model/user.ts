import { Clinic } from "../../patient.admin/models/clinic.model";

export interface User {
    id: string | null | undefined;
    name: string | null;
    password: string | null;
    address: string | null;
    userRole: string | null;
    clinics: Clinic[] | null;
}