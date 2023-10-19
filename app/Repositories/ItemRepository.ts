import { IItemResults } from "App/Interfaces/ItemInterface";
import Item from "../Models/Item";

export interface IItemRepository {
  getItemsById(id: string): Promise<IItemResults | null>;
  updateItems(item: IItemResults, id: number): Promise<IItemResults | null>;
  deleteItem(id: number): Promise<boolean>;
}

export default class ItemRepository implements IItemRepository {
  constructor() {}

  async getItemsById(id: string): Promise<IItemResults | null> {
    const res = await Item.find(id)
    return res
  }

  async updateItems(item: IItemResults, id: number ): Promise<IItemResults | null> {
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
