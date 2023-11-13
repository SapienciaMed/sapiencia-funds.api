import {
  IVotingFilters,
  IVotingResults,
} from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IMasterActivity } from "App/Interfaces/MasterActivityInterface";
import { IItemResults } from "App/Interfaces/ItemInterface";
import * as XLSX from "xlsx";

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
}

export default class VotingResultsService implements IVotingResultsService {
  constructor(private votingResultsRepository: IVotingResultsRepository) {}

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>> {
    const Activity = await this.votingResultsRepository.getVotingPaginate(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async getVotingPaginateXlsx(filters: IVotingFilters): Promise<any> {
    const Activity = await this.votingResultsRepository.getVotingPaginateXlsx(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async getPaginatedtotal(filters: IVotingFilters): Promise<any> {
    const Activity = await this.votingResultsRepository.getPaginatedtotal(
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

  async generateXlsx(rows: any): Promise<any> {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return buffer;
  }
}
