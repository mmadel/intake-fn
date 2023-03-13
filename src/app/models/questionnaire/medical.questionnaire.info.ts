import { PhysicalTherapy } from "./medical/physical.therapy";
import { RecommendationDoctor } from "./medical/recommendation.doctor";
import { RecommendationEntity } from "./medical/recommendation.entity";

export class MedicalQuestionnaireInfo {
    doctorRecommendation: boolean;
    appointmentBooking: string = '';
    primaryDoctor: string = '';
    familyResultSubmission: boolean = false;
    physicalTherapyReceiving: boolean = false;
    recommendationDoctor: RecommendationDoctor = new RecommendationDoctor();
    recommendationEntity: RecommendationEntity = new RecommendationEntity();
    physicalTherapy: PhysicalTherapy = new PhysicalTherapy();
}