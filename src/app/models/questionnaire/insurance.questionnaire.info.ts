import { WrokerComp } from "./Insurance/worker.comp";
import { WrokerNotComp } from "./Insurance/worker.not.comp";

export class InsuranceQuestionnaireInfo {
    isWrokerComp: boolean;
    wrokerCompModel: WrokerComp = new WrokerComp();
    WrokerNotCompModel: WrokerNotComp = new WrokerNotComp();
}