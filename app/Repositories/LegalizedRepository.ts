import {
  ILegalized,
  ILegalizedPaginatedFilters,
  ILegalizedPayload,
} from "App/Interfaces/Legalized";
import Legalized from "App/Models/Legalized";
import Env from "@ioc:Adonis/Core/Env";
import { ENV_NAMES } from "App/Utils/helpers";

export interface ILegalizedRepository {
  createLegalized(payload: ILegalizedPayload): Promise<ILegalized>;
}

export default class LegalizedRepository implements ILegalizedRepository {
  // CREATE LEGALIZED
  public async createLegalized(payload: ILegalizedPaginatedFilters) {
    return await Legalized.create({
      ...payload,
      userModified: Env.get(ENV_NAMES.CURRENT_USER_DOCUMENT),
    });
  }
}
