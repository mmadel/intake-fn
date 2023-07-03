export class MedicalHistroyInformation {
    height: string;
    heightUnit: string;
    weight: string;
    evaluationReason: string;
    medicationPrescription: string;
    patientCondition: string[];
    scanningTest: boolean;
    scanningTestValue: string = '';
    metalImplantation: boolean;
    pacemaker: boolean;
    surgeriesList: string;
}