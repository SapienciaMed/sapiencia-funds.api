import { IItemResults } from "App/Interfaces/ItemInterface";
import Item from "../Models/Item";

export interface IItemRepository {
  getVotingResultsById(id: string): Promise<IItemResults | null>;
}

export default class ItemRepository implements IItemRepository {
  constructor() {}

  async getVotingResultsById(id: string): Promise<IItemResults | null> {
    const res = await Item.find(id)
    return res
  }
}
