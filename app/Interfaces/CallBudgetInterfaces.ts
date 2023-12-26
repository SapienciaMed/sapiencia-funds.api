export interface ICallBudget {
  id_comuna: number;
  presupuesto_comuna: number;
  acumulado_legali_comuna: number;
  restante_presupuesto_comuna: number;
  numero_usuarios_comuna: number;
  total_proyectado: number;
  Diferencia: number;
}

export interface ICallBudgetFilters {
  id_comuna: number | number[] | string;
  periodo: number;
  page: number;
  perPage: number;
}

export type ICallCommuneBudget = {
  comuna: number;
  communebudget: number;
  accumulatedLegaliComuna: number;
  remainingCommuneBudget: number;
  numberUsersCommune: number;
  period: number;
  cutScore: number;
  closing: number;
  idfiducia: number;
  orden: number;
  modalidade: number;
};
