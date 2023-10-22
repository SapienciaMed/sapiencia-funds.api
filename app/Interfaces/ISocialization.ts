export interface ISocialization {
  id?: number;
  noProyect: number;
  communeCode: string;
  socializationDate: any;
  validity: number;
  valueGroup: string;
  financialPerformance: number;
  portfolioCollections: number;
  description?: string;
}

export interface ISocializationUpdate {
  id?: number;
  socializationDate: any;
  valueGroup: string;
  financialPerformance: number;
  portfolioCollections: number;
  description?: string;
}

export interface ISocializationFilters {
  noProyect: number;
  communeCode: number;
  validity: number;
  page: number;
  perPage: number;
}
