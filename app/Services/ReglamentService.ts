import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IReglamentFiltersInterface,
  IReglamentInterface,
} from "App/Interfaces/IReglamentInterface";
import { IReglamentRepository } from "App/Repositories/ReglamentRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IReglamentService {
  getReglamentById(id: number): Promise<ApiResponse<IReglamentInterface[]>>;
  getLastId(): Promise<ApiResponse<number>>;
  createReglament(
    reglament: IReglamentInterface
  ): Promise<ApiResponse<IReglamentInterface>>;
  getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<ApiResponse<IPagingData<IReglamentInterface>>>;
  updateReglament(
    requeriment: IReglamentInterface,
    id: number
  ): Promise<ApiResponse<IReglamentInterface | null>>;
  deleteReglament(id: number): Promise<ApiResponse<IReglamentInterface | null>>;
}

export default class ReglamentService implements IReglamentService {
  constructor(private reglamentRepository: IReglamentRepository) {}

  async getReglamentById(
    id: number
  ): Promise<ApiResponse<IReglamentInterface[]>> {
    const res = await this.reglamentRepository.getReglamentById(id);

    if (!res) {
      return new ApiResponse(
        {} as IReglamentInterface[],
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async getLastId(): Promise<ApiResponse<number>> {
    const res = await this.reglamentRepository.getLastId();
    if (!res) {
      return new ApiResponse(
        {} as number,
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async createReglament(
    reglament: IReglamentInterface
  ): Promise<ApiResponse<IReglamentInterface>> {
    const res = await this.reglamentRepository.createReglament(reglament);
    if (!res) {
      return new ApiResponse(
        {} as IReglamentInterface,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<ApiResponse<IPagingData<IReglamentInterface>>> {
    const requeriment = await this.reglamentRepository.getReglamentPaginate(
      filters
    );
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async updateReglament(
    reglament: IReglamentInterface,
    id: number
  ): Promise<ApiResponse<IReglamentInterface | null>> {
    const res = await this.reglamentRepository.updateReglament(reglament, id);

    if (!res) {
      return new ApiResponse(
        {} as IReglamentInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteReglament(
    id: number
  ): Promise<ApiResponse<IReglamentInterface | null>> {
    const res = await this.reglamentRepository.deleteReglament(id);

    if (!res) {
      return new ApiResponse(
        {} as IReglamentInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
