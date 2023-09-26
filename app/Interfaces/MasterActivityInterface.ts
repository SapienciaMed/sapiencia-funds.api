import {IProgramTypes} from "./TypesProgramInterface"
export interface IMasterActivity {
    id?: number;
    name: string
    totalValue: number;
    description:string;
    typesProgram?: IProgramTypes[];

}


export interface IMasterActivityFilters{
    codProgramCode: number;
    name: string
    page: number;
    perPage: number;
  }