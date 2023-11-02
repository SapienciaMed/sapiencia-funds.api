export interface IReglamentInterface {
  id?: number;
  program: string;
  initialPeriod: string;
  openPeriod: boolean;
  endPeriod?: string;
  theoreticalPercentage: number;
  applySocialService: boolean;
  socialServicePercentage?: number;
  socialServiceHours?: number;
  knowledgeTransferApply: boolean;
  knowledgeTransferPercentage?: number;
  knowledgeTransferHours?: number;
  gracePeriodApply: boolean;
  gracePeriodMonths?: number;
  gracePeriodApplication?: string;
  continuousSuspensionApplies: boolean;
  continuosSuspencionQuantity?: number;
  applyDiscontinuousSuspension: boolean;
  discontinuousSuspensionQuantity?: number;
  applySpecialSuspensions: boolean;
  applySpecialSuspensionsQuantity?: number;
  extensionApply: boolean;
  extensionApplyQuantity?: number;
  applyCondonationPerformancePeriod: boolean;
  periodPerformance?: string;
  accomulatedIncomeCondonationApplies: boolean;
  accomulatedPerformance?: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface IReglamentFiltersInterface {
  page: number;
  perPage: number;
}

export interface IRequerimentUpdateInterface {
  id?: number;
  status?: boolean;
}
