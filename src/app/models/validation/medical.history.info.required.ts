export interface MedicalHistoryInfoRequired {
    id: number | null
    height: boolean,
    weight: boolean,
    evaluationReason: boolean,
    medicationPrescription: boolean,
    patientCondition: boolean,
    scanningTest: boolean,
    scanningTestValue: boolean,
    metalImplantation: boolean,
    pacemaker: boolean,
    surgeriesList: boolean,
}