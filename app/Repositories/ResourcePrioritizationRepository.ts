import { IItemResults, IItemsFilters } from "App/Interfaces/ItemInterface";
import Item from "../Models/Item";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IResourcePrioritizationRepository {
  getResourcePrioritizationPaginated(
    filters: IItemsFilters
  ): Promise<IPagingData<IItemResults>>;
}

export default class ResourcePrioritizationRepository
  implements IResourcePrioritizationRepository
{
  constructor() {}

  async getResourcePrioritizationPaginated(
    filters: IItemsFilters
  ): Promise<IPagingData<IItemResults>> {
    const query = Item.query().preload("votingResult");

    if (filters.programId) {
      query.where("codPmaProgram", filters.programId);
    }

    if (filters.validity) {
      query.whereHas("votingResult", (q) =>
        q.where("validity", Number(filters.validity))
      );
    }

    if (filters.projectNumber) {
      query.whereHas("votingResult", (q) =>
        q.where("numberProject", Number(filters.projectNumber))
      );
    }

    const { data, meta } = (
      await query.paginate(filters.page, filters.perPage)
    ).serialize();

    return {
      array: data as IItemResults[],
      meta,
    };
  }
}
