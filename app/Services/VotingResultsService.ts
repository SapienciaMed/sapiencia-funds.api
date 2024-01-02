import {
  IVotingFilters,
  IVotingPaginateFilters,
  IVotingResults,
} from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IMasterActivity } from "App/Interfaces/MasterActivityInterface";
import { IItemResults } from "App/Interfaces/ItemInterface";
import { removeDuplicatedItems } from "App/Utils/helpers";

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
    filters: IVotingPaginateFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>>;
  getVotingPaginateXlsx(filters: IVotingFilters): Promise<any>;

  getPaginatedtotal(
    filters: Omit<IVotingPaginateFilters, "page" | "perPage">
  ): Promise<any>;
}

export default class VotingResultsService implements IVotingResultsService {
  constructor(private votingResultsRepository: IVotingResultsRepository) {}

  async getVotingPaginate(filters: IVotingPaginateFilters) {
    const { communeNeighborhood } = filters;
    const votingResultsFound =
      await this.votingResultsRepository.getVotingPaginate({
        ...filters,
        communeNeighborhood: removeDuplicatedItems(communeNeighborhood),
      });
    return new ApiResponse(votingResultsFound, EResponseCodes.OK);
  }

  async getVotingPaginateXlsx(filters: IVotingFilters): Promise<any> {
    const Activity = await this.votingResultsRepository.getVotingPaginateXlsx(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async getPaginatedtotal(
    filters: Omit<IVotingPaginateFilters, "page" | "perPage">
  ) {
    const { communeNeighborhood } = filters;
    const votingResultsFound =
      await this.votingResultsRepository.getPaginatedtotal({
        ...filters,
        communeNeighborhood: removeDuplicatedItems(communeNeighborhood),
      });
    return new ApiResponse(votingResultsFound, EResponseCodes.OK);
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
