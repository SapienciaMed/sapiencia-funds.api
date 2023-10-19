declare module "@ioc:core.ItemsProvider" {
  import { IItemService } from "App/Services/ItemService";

  const ItemsProvider: IItemService;
  export default ItemsProvider;
}