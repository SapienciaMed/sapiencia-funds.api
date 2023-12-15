import { ITypeMasterList } from "App/Interfaces/TypeMasterListinterface";
import Fiducia from "App/Models/Sapiencia/Fiducia";
import TypeMasterList from "App/Models/TypeMasterList";


export interface IFiduciaRepository {
  getFiduciaList(): Promise<any[]>;   
}

export default class FiduciaRepository  implements IFiduciaRepository
{
  constructor() {}

  async getFiduciaList(): Promise<any[]> {
    const res = await Fiducia.query();
    return res.map((i) => i.serialize() as any);
  }
}
  