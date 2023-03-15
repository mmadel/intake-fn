export class MedicalHistroyInformation {
    height: string;
    weight: string;
    evaluationReason: string;
    medicationPrescription: string;
    patientCondition: string[] = [];
    isScannig: boolean;
    ScannigValue: string = '';
    isMetalImplantation: boolean;
    isPacemaker: boolean;
    surgeriesList: string;
}