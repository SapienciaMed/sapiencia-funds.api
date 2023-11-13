import { IItemResults, IItemsFilters } from "App/Interfaces/ItemInterface";
import { IItemRepository } from "App/Repositories/ItemRepository";
import { IPagingData } from "App/Utils/ApiResponses";

export class ItemRepositoryFake implements IItemRepository {
  deleteItem(_id: number): Promise<boolean> {
    return Promise.resolve(false);
  }
  getItemsById(_id: string): Promise<IItemResults | null> {
    return Promise.resolve({} as IItemResults);
  }
  getItemsPaginated(
    _filters: IItemsFilters
  ): Promise<IPagingData<IItemResults>> {
    return Promise.resolve({} as IPagingData<IItemResults>);
  }
  updateItems(_item: IItemResults, _id: number): Promise<IItemResults | null> {
    return Promise.resolve({} as IItemResults);
  }
}
