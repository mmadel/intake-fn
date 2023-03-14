import { Patient } from "../models/patient/patient.model";

export class Patientcache {
    public static cache(modelName: string, pateint: Patient) {
        var patient: Patient = new Patient();
        patient = JSON.parse(localStorage.getItem('patient') || '{}');
        if (modelName === 'basic')
            patient.basicInfo = pateint.basicInfo;
        if (modelName === 'address')
            patient.addressInfo = pateint.addressInfo;
        if (modelName === 'medical')
            patient.medicalQuestionnaireInfo = pateint.medicalQuestionnaireInfo
        if (modelName === 'insurance')
            patient.insuranceQuestionnaireInfo = pateint.insuranceQuestionnaireInfo;

        localStorage.setItem('patient', JSON.stringify(patient));
    }
}