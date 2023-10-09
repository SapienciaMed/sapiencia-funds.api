import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ISocialization } from "App/Interfaces/ISocialization";
import { ISocializationRepository } from "App/Repositories/SocializationRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface ISocializationService {
  getSocializationById(id: number): Promise<ApiResponse<ISocialization>>;
}

export default class SocializationService implements ISocializationService {
  constructor(private socializationRepository: ISocializationRepository) {}

  async getSocializationById(id: number): Promise<ApiResponse<ISocialization>> {
    const res = await this.socializationRepository.getSocializationById(id);

    if (!res) {
      return new ApiResponse(
        {} as ISocialization,
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }
}
