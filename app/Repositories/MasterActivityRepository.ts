import { IMasterActivity } from "App/Interfaces/MasterActivityInterface";
import MasterActivity from "../Models/MasterActivity";

export interface IMasterActivityRepository {
    getMasterActivityById(id: string): Promise<IMasterActivity | null>;
  }
  
  export default class MasterActivityRepository implements IMasterActivityRepository {
    constructor() {}
  
    async getMasterActivityById(id: string): Promise<IMasterActivity | null> {
      const res = await MasterActivity.find(id)
      return res
    }
  }
  