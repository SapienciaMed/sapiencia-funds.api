import { IProgramTypes } from "App/Interfaces/TypesProgramInterface";
import TypesProgram from "App/Models/TypeProgram";

export interface ITypesProgramRepository {
  getTypesProgramList(): Promise<IProgramTypes[]>;
}

export default class TypesProgramRepository implements ITypesProgramRepository
{
  constructor() {}
  async getTypesProgramList(): Promise<IProgramTypes[]> {
    const res = await TypesProgram.all();
    return res as IProgramTypes[];
  }
}
