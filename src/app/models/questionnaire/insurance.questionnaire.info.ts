import { WrokerComp } from "./Insurance/worker.comp";
import { WrokerNotComp } from "./Insurance/worker.not.comp";

export class InsuranceQuestionnaireInfo {
    isCompNoFault: boolean;
    insuranceWorkerCompNoFault: WrokerComp = new WrokerComp();
    insuranceWorkerCommercial: WrokerNotComp = new WrokerNotComp();
}