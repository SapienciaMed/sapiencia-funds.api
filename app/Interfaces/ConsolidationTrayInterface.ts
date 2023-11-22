
export interface IConsolidationTrayForTechnicianCollection {
  searchParam?: string;
  cutParamName?: string; //TODO: Revisar
  cutParamId?: number; //TODO: Revisar
  page: number,
  perPage: number;
}

export interface IConsolidationTrayForTechnicianCollectionParams {
  creditId: string;
  nroFiducy: string;
  document: string;
  fullName: string;
  program: string;
  legalDate: string;
  dateIncomeCut: string;
  cut: string;
  dateFinallyCut: string;
  dateEndGracePeriod: string;
  status: string;
  reason: string;
  characterization: string;
  currentResponsible: string;
}
