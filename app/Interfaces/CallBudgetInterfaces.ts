export interface ICallBudget {
  id_comuna: number;
  presupuesto_comuna: string;
  acumulado_legali_comuna: string;
  restante_presupuesto_comuna: string;
  numero_usuarios_comuna: string;
  total_proyectado: number;
  Diferencia: number;
}

export interface ICallBudgetFilters {
  id_comuna: number | number[] | string;
  periodo: number;
  page: number;
  perPage: number;
}