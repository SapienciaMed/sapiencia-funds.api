import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import SummaryPriorizacionRepository from "App/Repositories/SummaryPriorizacionRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IItemResults } from "App/Interfaces/ItemInterface";
import { IPrioritizationSummaryFilters } from "App/Interfaces/SummaryPriorizacionInterfaces";
import { removeDuplicatedItems } from "App/Utils/helpers";

export interface IREsumenPriorizacionService {
  getVotingPaginate(
    filters: IPrioritizationSummaryFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>>;
  getVotingXLSX(filters: IVotingFilters): Promise<any>;
}

export default class SummaryPriorizacionService
  implements IREsumenPriorizacionService
{
  constructor(
    private resumenPriorizacionRepository: SummaryPriorizacionRepository
  ) {}

  async getVotingPaginate(filters: IPrioritizationSummaryFilters) {
    const { communeNeighborhood } = filters;
    const prioritizationSummaryFound =
      await this.resumenPriorizacionRepository.getVotingPaginate({
        ...filters,
        communeNeighborhood: removeDuplicatedItems(communeNeighborhood),
      });
    return new ApiResponse(prioritizationSummaryFound, EResponseCodes.OK);
  }
  async getVotingXLSX(filters: IVotingFilters): Promise<any> {
    const Activity = await this.resumenPriorizacionRepository.getVotinXSLX(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }
}
