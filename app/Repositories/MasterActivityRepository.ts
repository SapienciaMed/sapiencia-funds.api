import { IMasterActivity, IMasterActivityFilters } from "App/Interfaces/MasterActivityInterface";
import MasterActivity from "../Models/MasterActivity";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IMasterActivityRepository {
  createMasterActivity(
    manualDeduction: IMasterActivity
  ): Promise<IMasterActivity>;
  getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<IPagingData<IMasterActivity>>;
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


    async getMasterActivityPaginate(
      filters: IMasterActivityFilters
    ): Promise<IPagingData<IMasterActivity>> {
      const res = MasterActivity.query();
      const addProgramsTypeConditions = (query: any) => {
        query.preload("TypesProgram", (programTypeQuery) => {
          programTypeQuery.preload("charges")
          if (filters.name) {
            programTypeQuery.where("name", filters.name);
          }
          programTypeQuery.preload("worker")
        });
      };
  
      addProgramsTypeConditions(res);
  
      const workerMasterActivityPaginated = await res.paginate(
        filters.page,
        filters.perPage
      );
  
      const { data, meta } = workerMasterActivityPaginated.serialize();
      const dataArray = data ?? [];
  
      return {
        array: dataArray as IMasterActivity[],
        meta,
      };
    }


  }
  