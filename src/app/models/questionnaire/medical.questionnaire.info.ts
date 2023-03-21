import { PhysicalTherapy } from "./medical/physical.therapy";
import { RecommendationDoctor } from "./medical/recommendation.doctor";
import { RecommendationEntity } from "./medical/recommendation.entity";

export class MedicalQuestionnaireInfo {
    isDoctorRecommended: boolean;
    appointmentBooking: string;
    primaryDoctor: string;
    familyResultSubmission: boolean = false;
    physicalTherapyReceiving: boolean = false;
    recommendationDoctor: RecommendationDoctor | undefined;
    recommendationEntity: RecommendationEntity | undefined;
    physicalTherapy: PhysicalTherapy | undefined;
}