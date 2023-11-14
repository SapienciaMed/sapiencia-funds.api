import { IItemResults, IItemsFilters } from "App/Interfaces/ItemInterface";
import Item from "../Models/Item";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IItemRepository {
  getItemsById(id: string): Promise<IItemResults | null>;
  updateItems(item: IItemResults, id: number): Promise<IItemResults | null>;
  deleteItem(id: number): Promise<boolean>;
  getItemsPaginated(filters: IItemsFilters): Promise<IPagingData<IItemResults>>;
}

export default class ItemRepository implements IItemRepository {
  constructor() {}

  async getItemsPaginated(
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

  async getItemsById(id: string): Promise<IItemResults | null> {
    const res = await Item.find(id);
    return res;
  }

  async updateItems(
    item: IItemResults,
    id: number
  ): Promise<IItemResults | null> {
    const toUpdate = await Item.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...item });

    await toUpdate.save();

    return toUpdate.serialize() as IItemResults;
  }

  async deleteItem(id: number): Promise<boolean> {
    const toDelete = await Item.find(id);

    if (!toDelete) {
      return false;
    }

    await toDelete.delete();
    return true;
  }
}
