import Database from "@ioc:Adonis/Lucid/Database";
import { ICommuneResource } from "App/Interfaces/AbsorptionPercentage";
import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import CallBudget from "App/Models/Sapiencia/Callbudget";
import { DATABASE_NAMES } from "App/Utils/helpers";

export interface IBeneficiaryInformationRepository {}

export default class BeneficiaryInformationRepository
  implements IBeneficiaryInformationRepository
{
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
}
