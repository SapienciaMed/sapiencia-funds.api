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
