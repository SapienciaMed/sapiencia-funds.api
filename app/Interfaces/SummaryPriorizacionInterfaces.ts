export interface IResumPriorizacionFilters {
  communeNeighborhood?: number;
  numberProject?: number;
  validity?: string;
  page: number;
  perPage: number;
}

export type IPrioritizationSummaryFilters = {
  numberProject: number;
  communeNeighborhood: number[];
  validity: string;
  page: number;
  perPage: number;
};
