import { Patient } from "../models/patient/patient.model";

export class Patientcache {
    public static cache(modelName: string, pateintHolder: Patient) {
        var patient: Patient = new Patient();
        patient = JSON.parse(localStorage.getItem('patient') || '{}');
        if (modelName === 'basic')
            patient.basicInfo = pateintHolder.basicInfo;
        if (modelName === 'address')
            patient.addressInfo = pateintHolder.addressInfo;
        if (modelName === 'medical')
            patient.medicalQuestionnaireInfo = pateintHolder.medicalQuestionnaireInfo
        if (modelName === 'insurance')
            patient.insuranceQuestionnaireInfo = pateintHolder.insuranceQuestionnaireInfo;
        if (modelName === 'medical-history')
            patient.medicalHistoryInformation = pateintHolder.medicalHistoryInformation;
        if (modelName === 'aggreements')
            patient.agreements = pateintHolder.agreements;

        localStorage.setItem('patient', JSON.stringify(patient));
    }
}