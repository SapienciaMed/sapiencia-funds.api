import { IItemResults } from "App/Interfaces/ItemInterface";
import { IItemRepository } from "App/Repositories/ItemRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IItemService {
  getVotingResultsById(id: string): Promise<ApiResponse<IItemResults>>;
}

export default class ItemService implements IItemService {
  constructor(private votingResultsRepository: IItemRepository) {}

  async getVotingResultsById(id: string): Promise<ApiResponse<IItemResults>> {
    const res = await this.votingResultsRepository.getVotingResultsById(id);

    if (!res) {
      return new ApiResponse(
        {} as IItemResults,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}
