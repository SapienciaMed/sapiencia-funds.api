export interface ICallBudget {
  id_comuna: number;
  presupuesto_comuna: string;
  legaliza_comuna: string;
  restante_presupuesto: string;
  usuarios_comuna: string;
  periodo: number;
  puntaje_corte: number;
}

export interface ICallBudgetFilters{
  id_comuna?: number;
  periodo: number;
  page: number;
  perPage: number;
}
   