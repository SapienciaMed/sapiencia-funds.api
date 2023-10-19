import { ITypeMasterList } from "App/Interfaces/TypeMasterListinterface";
import TypeMasterList from "App/Models/TypeMasterList";


export interface ITypeMasterListRepository {
    getTypeMasterList(): Promise<ITypeMasterList[]>;   
}

export default class TypeMasterListRepository  implements ITypeMasterListRepository
{
  constructor() {}

  async getTypeMasterList(): Promise<ITypeMasterList[]> {
    const res = await TypeMasterList.query();
    return res.map((i) => i.serialize() as ITypeMasterList);
  }
}
  