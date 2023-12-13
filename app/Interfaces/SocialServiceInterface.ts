import { IBeneficiariesConsolidateInterface } from "./BeneficiariesConsolidateInterface";

export interface ISocialServiceFiltersInterface {
  id: number;
  page: number;
  perPage: number;
}

export interface ISocialServiceBeneficiary {
  id?: number;
  legalizationPeriod: string;
  consolidationBeneficiary: number;
  hoursBorrowed: number;
  committedHours: number;
  pendingHours: number;
  supportDocumentRoute: string;
  observation: string;
  state: boolean;
  beneficiarieConsolidate?: IBeneficiariesConsolidateInterface;
}
