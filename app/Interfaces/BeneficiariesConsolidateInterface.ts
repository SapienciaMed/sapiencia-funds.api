import { IProgramInterface } from "./ProgramInterface";
import { IRequerimentsConsolidate } from "./requerimentsConsolidateInterface";

export interface IBeneficiariesConsolidateInterface {
  id?: number | any;
  name: string;
  from: string;
  until: string;
  idProgram?: number;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
  requerimentsConsolidate?: IRequerimentsConsolidate[];
  programs?: IProgramInterface;
}

export interface IBeneficiariesConsolidateFiltersInterface {
  name: string;
  from: string;
  until: string;
  page: number;
  perPage: number;
}
