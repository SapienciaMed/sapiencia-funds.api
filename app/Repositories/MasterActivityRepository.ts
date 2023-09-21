import { IMasterActivity } from "App/Interfaces/MasterActivityInterface";
import MasterActivity from "../Models/MasterActivity";

export interface IMasterActivityRepository {
  createMasterActivity(
    manualDeduction: IMasterActivity
  ): Promise<IMasterActivity>;
}

export default class MasterActivityRepository implements IMasterActivityRepository {
    constructor() {}
  
    async createMasterActivity(
      manualDeduction: IMasterActivity
    ): Promise<IMasterActivity> {
      const toCreate = new MasterActivity();
  
      toCreate.fill({ ...manualDeduction });
      await toCreate.save();
      return toCreate.serialize() as IMasterActivity;
    }

  }
  