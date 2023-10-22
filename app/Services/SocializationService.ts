import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ISocialization,
  ISocializationFilters,
  ISocializationUpdate,
} from "App/Interfaces/ISocialization";
import { ISocializationRepository } from "App/Repositories/SocializationRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface ISocializationService {
  getSocializationById(id: number): Promise<ApiResponse<ISocialization[]>>;
  createSocialization(
    socialization: ISocialization
  ): Promise<ApiResponse<ISocialization>>;
  getSocializationPaginate(
    filters: ISocializationFilters
  ): Promise<ApiResponse<IPagingData<ISocialization>>>;
  updateSocialization(
    socialization: ISocializationUpdate,
    id: number
  ): Promise<ApiResponse<ISocialization | null>>;
}

export default class SocializationService implements ISocializationService {
  constructor(private socializationRepository: ISocializationRepository) {}

  async getSocializationById(
    id: number
  ): Promise<ApiResponse<ISocialization[]>> {
    const res = await this.socializationRepository.getSocializationById(id);

    if (!res) {
      return new ApiResponse(
        {} as ISocialization[],
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async createSocialization(
    socialization: ISocialization
  ): Promise<ApiResponse<ISocialization>> {
    const res = await this.socializationRepository.createSocialization(
      socialization
    );
    if (!res) {
      return new ApiResponse(
        {} as ISocialization,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getSocializationPaginate(
    filters: ISocializationFilters
  ): Promise<ApiResponse<IPagingData<ISocialization>>> {
    const socialization =
      await this.socializationRepository.getSocializationPaginate(filters);
    return new ApiResponse(socialization, EResponseCodes.OK);
  }

  async updateSocialization(
    socialization: ISocializationUpdate,
    id: number
  ): Promise<ApiResponse<ISocialization | null>> {
    const res = await this.socializationRepository.updateSocialization(
      socialization,
      id
    );

    if (!res) {
      return new ApiResponse(
        {} as ISocialization,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
