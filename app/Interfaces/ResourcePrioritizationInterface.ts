export interface IResourcePrioritizationFilters {
  page: number;
  perPage: number;
  projectId?: number;
  programNumber?: number;
  validity?: number;
  generalRate?: number;
  operatorCommissionAct?: number;
  operatorCommissionBalance?: number;
  operatorCommission?: number;
}

export interface IResourcePrioritization {
  id?: number;
  programId: number;
  projectNumber: number;
  validityYear: number;
  communeId: string;
  percentage123: number;
  percentage456: number;
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
