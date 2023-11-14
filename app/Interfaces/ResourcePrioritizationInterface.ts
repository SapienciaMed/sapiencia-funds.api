export interface IResourcePrioritizationFilters {
  page: number;
  perPage: number;
  projectNumber: number;
  programId: number;
  validity: number;
}

export interface ITotalsPrioritizationFilters {
  projectNumber: number;
  programId: number;
  validity: number;
}

export interface IResourcePrioritization {
  id?: number;
  programId: number;
  projectNumber: number;
  validity: number;
  communeId: number;
  total123: number;
  total456: number;
  value: number;
  places: number;
  averageCost: number;
  generalRate: number;
  operatingCostAndExpense: number;
  grossValue: number;
  financialPerformances: number;
  balanceResources: number;
  operatorCommissionAct: number;
  operatorCommissionBalance: number;
  operatorCommission: number;
  resourceForCredit: number;
}

export interface IGroupedResults {
  communeId: number;
  programId: number;
  value: number;
  places: number;
  total123: number;
  total456: number;
}
