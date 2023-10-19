import { DateTime } from "luxon";
import {IProgramTypes} from "./TypesProgramInterface"
export interface IMasterActivity {
    id?: number;
    name: string
    totalValue: number;
    description?:string;
    typesProgram?: IProgramTypes[];
    userModify?: string;
    dateModified?: DateTime;
    userCreate?: string;
    dateCreate?: DateTime;
}


export interface IMasterActivityFilters{
    id?: number;
    codProgramCode: number;
    name: string
    page: number;
    perPage: number;
}


export interface IMasterActivityVoting {
    id?: number;
    name: string
    totalValue: number;
    description?:string;
    codProgramCode?: number;

}