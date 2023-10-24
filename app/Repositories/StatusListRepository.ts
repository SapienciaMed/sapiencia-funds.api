import { ITypeMasterList } from "App/Interfaces/TypeMasterListinterface";
import { IStatus } from "App/Interfaces/statusInterface";
import State from "App/Models/State";

export interface IStatusListRepository {
    getStatusList(): Promise<ITypeMasterList[]>;   
}

export default class StatusListRepository  implements IStatusListRepository
{
  constructor() {}

  async getStatusList(): Promise<ITypeMasterList[]> {
    const res = await State.query();
    return res.map((i) => i.serialize() as IStatus);
  }
}
  