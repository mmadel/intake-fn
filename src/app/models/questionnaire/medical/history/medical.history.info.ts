export class MedicalHistroyInformation {
    height: string;
    heightUnit: string = 'inch';
    weight: string ;
    weightUnit: string = 'pound';
    evaluationReason: string;
    medicationPrescription: string;
    patientCondition: string[];
    scanningTest: boolean;
    scanningTestValue: string = '';
    metalImplantation: boolean;
    pacemaker: boolean;
    surgeriesList: string;
}