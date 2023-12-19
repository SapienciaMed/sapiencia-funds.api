import Database from "@ioc:Adonis/Lucid/Database";
import { ICommuneResource } from "App/Interfaces/AbsorptionPercentage";
import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import CallBudget from "App/Models/Sapiencia/Callbudget";
import { DATABASE_NAMES } from "App/Utils/helpers";

export interface ICallBudgetRepository {
  getAllCallBudget(): Promise<ICallBudget[]>;
  getAllCommuneResources(): Promise<ICommuneResource[]>;
  getResourceByCommuneId(communeId: number): Promise<ICommuneResource>;
}

export default class CallBudgetRepository implements ICallBudgetRepository {
  constructor() {}

  async getAllCallBudget(): Promise<ICallBudget[]> {
    const res = await CallBudget.query();

    return res.map((i) => i.serialize() as ICallBudget);
  }
  public async getAllCommuneResources() {
    const query = "CALL getCommuneResources";
    const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
      query
    );
    return resp?.[0]?.[0]?.filter((el: ICommuneResource) => el.recurso !== "0");
  }
  public async getResourceByCommuneId(communeId: number) {
    const query = `CALL getResourceByCommune(${communeId})`;
    const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
      query
    );
    const resourceFound = resp?.[0]?.[0];
    if (resourceFound?.length === 0) {
      throw new Error("No se ha encontrado un recurso para esta comuna");
    }
    return resourceFound?.[0];
  }
}
