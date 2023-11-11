import { IItemResults } from "./ItemInterface";

export interface IVotingResults {
  id?: number;
  communeNeighborhood: number;
  numberProject: number;
  validity: string;
  ideaProject: string;
  items?: IItemResults[];
  generalRate?: number;
  operatorCommissionAct?: number;
  operatorCommissionBalance?: number;
  operatorCommission?: number;
}

export interface IActivity {
  id?: number;
  nombre: string;
}

export interface IVotingFilters {
  communeNeighborhood?: number;
  numberProject?: number;
  validity?: string;
  ideaProject?: string;
  page: number;
  perPage: number;
}

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

export interface IResourcePrioritizationResult {
  communeName: string;
  percentage123: number;
  percentage456: number;
  value: number;
  places: number;
}
// Columna 4: Valor, se cargará el valor de las comunas relacionadas con el número de proyecto, , si el dato ya existe cargará ese, sino, este dato lo trae de territorio y/o planeación HU 204
// Columna 5: Cupos, se cargará los cupos de las comunas relacionadas con el número de proyecto, , si el dato ya existe cargará ese, sino, este dato lo trae de territorio y/o planeación HU 204
// columna 6: Costo promedio, campo numérico, cargará en 0 y podrá ser digitable con la acción en el icono lápiz, si el dato ya existe cargará ese dato.
// columna 7:tasa general, Campo numérico, este dato se cargará el dato de Tasa general costos y gastos, sin embargo, va a quedar digitable
// columna 8: costo y gasto de operación, Campo numérico, este dato es calculado por el valor x el valor de la tasa general
// columna 9: valor bruto, Campo numérico, este dato es calculado, su formula  es, valor menos el costo y gasto de operación
// columna 10: Recurso del balance, Campo numérico, cargará en 0 y podrá ser digitable con la acción en el icono lápiz, si el dato ya existe cargará ese dato.
// columna 11: Rendimientos financieros, Campo numérico, cargará en 0 y podrá ser digitable con la acción en el icono lápiz, si el dato ya existe cargará ese dato.
// columna 12: Comisión operador financiero, Campo numérico, este dato es calculado, su formula es, rendimientos financieros/(1 más tasa de Comisión operador financiero)
// columna 13: Comisión operador financiero balance, Campo numérico, este dato es calculado, su formula es, recurso del balance/(1 más tasa de Comisión operador financiero balance)
// columna 14: Comisión operador financiero acta, Campo numérico, este dato es calculado, su formula es, valor bruto/(1 más tasa de Comisión operador financiero acta)
// columna 15: Recurso para crédito, Campo numérico, este dato es calculado, su formula es, valor bruto más recurso de balance más rendimientos financieros menos las 3 comisiones
