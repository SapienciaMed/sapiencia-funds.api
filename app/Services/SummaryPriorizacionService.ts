import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import  SummaryPriorizacionRepository  from "App/Repositories/SummaryPriorizacionRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IItemResults } from "App/Interfaces/ItemInterface";

export interface IREsumenPriorizacionService {
  getVotingPaginate(filters: IVotingFilters): Promise<ApiResponse<IPagingData<IItemResults>>>;
}

export default class SummaryPriorizacionService implements IREsumenPriorizacionService {
  constructor(private resumenPriorizacionRepository: SummaryPriorizacionRepository) {}

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>> {
    const Activity =
      await this.resumenPriorizacionRepository.getVotingPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }


}