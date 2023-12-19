import { IReglamentInterface } from "./IReglamentInterface";

export interface IProgramInterface{
    id:number;
    value:string;
    reglaments?:IReglamentInterface[];

}