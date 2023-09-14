import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IVotingResultsService {
  getVotingResultsById(id: string): Promise<ApiResponse<IVotingResults>>;
}

export default class VotingResultsService implements IVotingResultsService {
  constructor(private votingResultsRepository: IVotingResultsRepository) {}

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
}
