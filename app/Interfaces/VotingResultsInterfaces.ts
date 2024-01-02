import { IItemResults } from "./ItemInterface";

export interface IVotingResults {
  id?: number;
  communeNeighborhood: number;
  numberProject: number;
  validity: number;
  ideaProject: string;
  items?: IItemResults[];
  observation?: string;
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

export type IVotingPaginateFilters = {
  communeNeighborhood: number[];
  numberProject?: number;
  validity: string;
  ideaProject?: string;
  page?: number;
  perPage?: number;
};
