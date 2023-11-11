import {
  IResourcePrioritizationResult,
  IVotingFilters,
  IVotingResults,
} from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IMasterActivity } from "App/Interfaces/MasterActivityInterface";
import { IItemRepository } from "../Repositories/ItemRepository";
import { IItemResults, IItemsFilters } from "App/Interfaces/ItemInterface";

export interface IVotingResultsService {
  getVotingResultsById(id: string): Promise<ApiResponse<IVotingResults>>;
  getActivityProgram(id: number): Promise<ApiResponse<IMasterActivity[]>>;
  createVotingResult(
    voting: IVotingResults
  ): Promise<ApiResponse<IVotingResults>>;
  updateVotingResult(
    voting: IVotingResults,
    id: number
  ): Promise<ApiResponse<IVotingResults>>;
  getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>>;
  getResourcePrioritizationPaginate(
    filters: IItemsFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritizationResult>>>;
}

export default class VotingResultsService implements IVotingResultsService {
  constructor(
    private votingResultsRepository: IVotingResultsRepository,
    private itemRepository: IItemRepository
  ) {}

  async getResourcePrioritizationPaginate(
    filters: IItemsFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritizationResult>>> {
    const items = await this.itemRepository.getItemsPaginated(filters);

    const toReturn: IResourcePrioritizationResult[] = [];

    for (const item of items.array) {
      toReturn.push({
        communeName: String(item.votingResult?.communeNeighborhood),
        percentage123: Number(item.percentage123),
        percentage456: Number(item.percentage456),
        value: item.costTotal,
        places: item.amount,
      });
    }

    return new ApiResponse(
      {
        array: toReturn,
        meta: items.meta,
      },
      EResponseCodes.OK
    );
  }

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>> {
    const Activity = await this.votingResultsRepository.getVotingPaginate(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async getVotingResultsById(id: string): Promise<ApiResponse<IVotingResults>> {
    const res = await this.votingResultsRepository.getVotingResultsById(id);

    if (!res) {
      return new ApiResponse(
        {} as IVotingResults,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getActivityProgram(
    id: number
  ): Promise<ApiResponse<IMasterActivity[]>> {
    const res = await this.votingResultsRepository.getActivityProgram(id);

    if (!res) {
      return new ApiResponse(
        {} as IMasterActivity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createVotingResult(
    voting: IVotingResults
  ): Promise<ApiResponse<IVotingResults>> {
    const res = await this.votingResultsRepository.createVotingResult(voting);
    if (!res) {
      return new ApiResponse(
        {} as IVotingResults,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async updateVotingResult(
    voting: IVotingResults,
    id: number
  ): Promise<ApiResponse<IVotingResults>> {
    const res = await this.votingResultsRepository.updateVotingResult(
      voting,
      id
    );
    if (!res) {
      return new ApiResponse(
        {} as IVotingResults,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}
