import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IRequerimentFiltersInterface,
  IRequerimentInterface,
  IRequerimentUpdateInterface,
} from "App/Interfaces/IRequerimentInterface";
import { IRequerimentRepository } from "App/Repositories/RequerimentRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IRequerimentService {
  createRequeriment(
    requeriment: IRequerimentInterface
  ): Promise<ApiResponse<IRequerimentInterface>>;
  getRequerimentPaginate(
    filters: IRequerimentFiltersInterface
  ): Promise<ApiResponse<IPagingData<IRequerimentInterface>>>;
  updateRequeriment(
    requeriment: IRequerimentUpdateInterface,
    id: number
  ): Promise<ApiResponse<IRequerimentInterface | null>>;
  deleteRequeriment(
    id: number
  ): Promise<ApiResponse<IRequerimentInterface | null>>;
}

export default class RequerimentService implements IRequerimentService {
  constructor(private requerimentRepository: IRequerimentRepository) {}

  async createRequeriment(
    requeriment: IRequerimentInterface
  ): Promise<ApiResponse<IRequerimentInterface>> {
    const res = await this.requerimentRepository.createRequeriment(requeriment);
    if (!res) {
      return new ApiResponse(
        {} as IRequerimentInterface,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getRequerimentPaginate(
    filters: IRequerimentFiltersInterface
  ): Promise<ApiResponse<IPagingData<IRequerimentInterface>>> {
    const requeriment = await this.requerimentRepository.getRequerimentPaginate(
      filters
    );
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async updateRequeriment(
    socialization: IRequerimentUpdateInterface,
    id: number
  ): Promise<ApiResponse<IRequerimentInterface | null>> {
    const res = await this.requerimentRepository.updateRequeriment(
      socialization,
      id
    );

    if (!res) {
      return new ApiResponse(
        {} as IRequerimentInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteRequeriment(
    id: number
  ): Promise<ApiResponse<IRequerimentInterface | null>> {
    const res = await this.requerimentRepository.deleteRequeriment(id);

    if (!res) {
      return new ApiResponse(
        {} as IRequerimentInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
