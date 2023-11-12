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
