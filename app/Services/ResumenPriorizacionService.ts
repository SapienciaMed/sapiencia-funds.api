import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import  ResumenPriorizacionRepository  from "App/Repositories/ResumenPriorizacionRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IItemResults } from "App/Interfaces/ItemInterface";

export interface IREsumenPriorizacionService {
  getVotingPaginate(filters: IVotingFilters): Promise<ApiResponse<IPagingData<IItemResults>>>;
}

export default class ResumenPriorizacionService implements IREsumenPriorizacionService {
  constructor(private resumenPriorizacionRepository: ResumenPriorizacionRepository) {}

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>> {
    const Activity =
      await this.resumenPriorizacionRepository.getVotingPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }


}
