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

export interface IPrioritizationPrintExcel {
  "Comuna y/o corregimiento": string;
  "Porcentaje 123": number;
  "Porcentaje 456": number;
  "Valor": number;
  "Cupos": number;
  "Costo promedio": number;
  "Tasa general": number;
  "Costo y gasto de operación": number;
  "Valor bruto": number;
  "Recurso del balance": number;
  "Rendimientos financieros": number;
  "Comisión operador financiero": number;
  "Comisión operador financiero balance": number;
  "Comisión operador financiero acta": number;
  "Recurso para crédito": number;
}



export interface IGroupedResults {
  communeId: number;
  programId: number;
  value: number;
  places: number;
  total123: number;
  total456: number;
}
