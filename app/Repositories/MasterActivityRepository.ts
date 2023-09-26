import {
  IMasterActivity,
  IMasterActivityFilters,
} from "App/Interfaces/MasterActivityInterface";
import {IProgramTypes} from "app/Interfaces/TypesProgramInterface"
import MasterActivity from "../Models/MasterActivity";
import { IPagingData } from "App/Utils/ApiResponses";
import TypesProgram from "App/Models/TypeProgram";

export interface IMasterActivityRepository {
  createMasterActivity(
    manualDeduction: IMasterActivity
  ): Promise<IMasterActivity>;
  getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<IPagingData<IMasterActivity>>;
  getActivityList(): Promise<IMasterActivity[]>;
  getActivityById(id: number): Promise<IMasterActivity[] | null>;
  updateMasterActivity(
    activity: IMasterActivity,
    id: number
  ): Promise<IMasterActivity | null>;
  getProgramList(): Promise<IProgramTypes[]>;
}

export default class MasterActivityRepository
  implements IMasterActivityRepository
{
  constructor() {}

  async createMasterActivity(
    manualDeduction: IMasterActivity
  ): Promise<IMasterActivity> {
    const toCreate = new MasterActivity();

    toCreate.fill({ ...manualDeduction });
    await toCreate.save();
    return toCreate.serialize() as IMasterActivity;
  }

  async getActivityList(): Promise<IMasterActivity[]> {
    const res = await MasterActivity.query().preload("typesProgram");
    return res.map((i) => i.serialize() as IMasterActivity);
  }

  async getProgramList(): Promise<IProgramTypes[]> {
    const programList = await TypesProgram.all();
    return programList as IProgramTypes[];
  }

  async getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<IPagingData<IMasterActivity>> {
    const res = MasterActivity.query().preload("typesProgram");

    if (filters.name) {
      res.whereILike("name", `%${filters.name}%`);
    }

    if (filters.codProgramCode) {
      res.where("codProgramCode", filters.codProgramCode);
    }

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

  async getActivityById(id: number): Promise<IMasterActivity[] | null> {
    const queryActivity = MasterActivity.query().where("id", id);

    const masterActivity = await queryActivity;

    if (masterActivity.length == 0) {
      return null;
    }

    return masterActivity.map((i) => i.serialize() as IMasterActivity);
  }

  async updateMasterActivity(
    masterActivity: IMasterActivity,
    id: number
  ): Promise<IMasterActivity | null> {
    const toUpdate = await MasterActivity.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...masterActivity });

    await toUpdate.save();

    return toUpdate.serialize() as IMasterActivity;
  }
}
