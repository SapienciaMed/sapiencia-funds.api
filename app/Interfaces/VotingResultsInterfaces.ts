import { IItemResults } from "./ItemInterface";

export interface IVotingResults {
  id?: number;
  communeNeighborhood: number;
  numberProject: number;
  validity: string;
  ideaProject: string;
  items?: IItemResults[];
}


export interface IActivity {
  id?: number;
  nombre: string
}
