import { IBeneficiariesConsolidateInterface } from "./BeneficiariesConsolidateInterface";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IFiles } from "./StorageInterfaces";

export interface ExternalFilesSapiencia {
  documentPath: string;
  parameters: [
    {
      documento: string;
      tipo: string;
      periodo: string;
      npseleccion: string;
    }
  ];
}

export interface ISocialServiceFiltersInterface {
  id: number;
  page: number;
  perPage: number;
  typeState: number;
}

export interface ISocialServiceBeneficiary {
  id?: number;
  legalizationPeriod: string;
  idConsolidationBeneficiary: number;
  hoursDone: number;
  committedHours: number;
  pendingHours: number;
  totalPendingHours?: number;
  documentPath: string;
  observation: string;
  state: boolean;
  files?: MultipartFileContract[];
  infoFiles?: IFiles[];
  externalInfoFiles?: ExternalFilesSapiencia;
  editable: boolean;
  beneficiarieConsolidate?: IBeneficiariesConsolidateInterface;
}
