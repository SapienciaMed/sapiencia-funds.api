import { IItemResults } from "App/Interfaces/ItemInterface";
import { IItemRepository } from "App/Repositories/ItemRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IItemService {
  getItemsById(id: string): Promise<ApiResponse<IItemResults>>;
  updateItems(item: IItemResults, id: number): Promise<ApiResponse<IItemResults>>;
  deleteItem(id: number): Promise<ApiResponse<boolean>>;
}

export default class ItemService implements IItemService {
  constructor(private itemRepository: IItemRepository) {}

  async getItemsById(id: string): Promise<ApiResponse<IItemResults>> {
    const res = await this.itemRepository.getItemsById(id);

    if (!res) {
      return new ApiResponse(
        {} as IItemResults,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async updateItems(item: IItemResults, id: number): Promise<ApiResponse<IItemResults>> {  
    const res = await this.itemRepository.updateItems(item, id);  
    if (!res) {
      return new ApiResponse(
        {} as IItemResults,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
  
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteItem(id: number): Promise<ApiResponse<boolean>> {
    const res = await this.itemRepository.deleteItem(id);

    if (!res) {
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(true, EResponseCodes.OK);
  }
}
