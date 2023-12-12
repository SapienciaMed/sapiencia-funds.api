
export interface ICallPeriodSapi {
  id: number;
  name: string;
  nameComplementary?: string;
  minimumSalary: number;
  status: string;
}

export interface IReglamentConsolidation {
  id?: number;
  programId: number;
  initialPeriod: string;
  isOpenPeriod: boolean;
  endPeriod: string;
}

// export interface IReglamentInterface {
//   id?: number | any;
//   program: string;
//   initialPeriod: string;
//   isOpenPeriod: boolean;
//   endPeriod?: string | any;
//   theoreticalPercentage: number;
//   applySocialService: boolean;
//   socialServicePercentage?: number | any;
//   socialServiceHours?: number | any;
//   knowledgeTransferApply: boolean;
//   knowledgeTransferPercentage?: number | any;
//   knowledgeTransferHours?: number | any;
//   gracePeriodApply: boolean;
//   gracePeriodMonths?: number | any;
//   gracePeriodApplication?: string | any;
//   continuousSuspensionApplies: boolean;
//   continuosSuspencionQuantity?: number | any;
//   applyDiscontinuousSuspension: boolean;
//   discontinuousSuspensionQuantity?: number | any;
//   applySpecialSuspensions: boolean;
//   applySpecialSuspensionsQuantity?: number | any;
//   extensionApply: boolean;
//   extensionApplyQuantity?: number | any;
//   applyCondonationPerformancePeriod: boolean;
//   periodPerformance?: string | any;
//   performancePeriod?: string | any;
//   accomulatedIncomeCondonationApplies: boolean;
//   accomulatedPerformance?: string | any;
//   accumulatedPerformance?: string | any;
//   modifyUser?: string;
//   modifyDate?: string;
//   createUser: string;
//   createDate: string;
// }