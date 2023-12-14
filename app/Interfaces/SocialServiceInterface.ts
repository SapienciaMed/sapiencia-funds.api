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
  hoursDone: number;
  committedHours: number;
  pendingHours: number;
  totalPendingHours?: number;
  supportDocumentRoute: string;
  observation: string;
  state: boolean;
  beneficiarieConsolidate?: IBeneficiariesConsolidateInterface;
}
