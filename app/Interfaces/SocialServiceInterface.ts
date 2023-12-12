import { IBeneficiariesConsolidateInterface } from "./BeneficiariesConsolidateInterface";

export interface ISocialServiceFiltersInterface {
  id: number;
  page: number;
  perPage: number;
}

export interface ISocialServiceBeneficiary{
  id:number;
  legalizationPeriod: string;
  consolidationBeneficiary: number;
  hoursBorrowed: number;
  supportDocumentRoute: string;
  beneficiarieConsolidate: IBeneficiariesConsolidateInterface;
}
