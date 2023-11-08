export interface IItemResults {
  id?: number;
  aimStraight: string;
  productCatalogueDnp: string;
  codProductgueDnp: string;
  codPmaProgram: number;
  codMtaTeacherActivity: number;
  amount: string;
  costTotal: string;
  percentage123: string;
  percentage456: string;
  codRtVotingResult?: string;
}

export interface ISummaryPriorization {
  program: string;
  pct123: number;
  pct456: number;
  quota: number;
  total123: number;
  total456: number;
  total: number;
}

export interface ISummaryPriorizationXlsx {
  Programa: string;
  Porcentaje123: number;
  Porcentaje456: number;
  Cupos: number;
  Valor_Porcentaje456: number;
  Valor_Porcentaje123: number;
  Total: number;
}
