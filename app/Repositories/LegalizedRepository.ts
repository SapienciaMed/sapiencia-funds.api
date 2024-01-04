import {
  ILegalized,
  ILegalizedPaginatedFilters,
  ILegalizedPayload,
  ILegalizedQueryFilters,
} from "App/Interfaces/Legalized";
import Legalized from "App/Models/Legalized";
import Env from "@ioc:Adonis/Core/Env";
import { ENV_NAMES } from "App/Utils/helpers";

export interface ILegalizedRepository {
  createLegalized(payload: ILegalizedPayload): Promise<ILegalized>;
  getLegalizedInfoByFilters(
    filters: ILegalizedQueryFilters
  ): Promise<ILegalized | null>;
}

export default class LegalizedRepository implements ILegalizedRepository {
  // CREATE LEGALIZED
  public async createLegalized(payload: ILegalizedPaginatedFilters) {
    return await Legalized.create({
      ...payload,
      userModified: Env.get(ENV_NAMES.CURRENT_USER_DOCUMENT),
    });
  }
  // GET LEGALIZED INFO BY FILTERS
  public async getLegalizedInfoByFilters(filters: ILegalizedQueryFilters) {
    const { announcementId, communeFundId, fiduciaryId } = filters;
    const legalizedQuery = Legalized.query();
    legalizedQuery.where("announcementId", announcementId);
    legalizedQuery.where("communeFundId", communeFundId);
    legalizedQuery.where("fiduciaryId", fiduciaryId);
    const legalizedFound = await legalizedQuery.first();
    if (legalizedFound === null) return legalizedFound;
    return legalizedFound.serializeAttributes() as ILegalized;
  }
}
