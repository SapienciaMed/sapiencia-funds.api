import { IVotingResults } from "./VotingResultsInterfaces";

export interface IItemResults {
  id?: number;
  aimStraight: string;
  productCatalogueDnp: string;
  codProductgueDnp: string;
  codPmaProgram: number;
  codMtaTeacherActivity: number;
  amount: number;
  costTotal: number;
  percentage123: number;
  percentage456: number;
  codRtVotingResult?: number;


  votingResult?: IVotingResults;
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

export interface IItemsFilters {
  page: number;
  perPage: number;
  projectNumber?: number;
  programId?: number;
  validity?: number;
}
