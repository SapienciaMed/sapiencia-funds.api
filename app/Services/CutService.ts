import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ICutFiltersInterface,
  ICutInterface,
} from "App/Interfaces/CutInterface";
import { ICutRepository } from "App/Repositories/CutRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface ICutService {
  getCutById(id: number): Promise<ApiResponse<ICutInterface[]>>;
  createCut(Cut: ICutInterface): Promise<ApiResponse<ICutInterface | null>>;
  getCutPaginate(
    filters: ICutFiltersInterface
  ): Promise<ApiResponse<IPagingData<ICutInterface>>>;
  updateCut(
    requeriment: ICutInterface,
    id: number
  ): Promise<ApiResponse<ICutInterface | null>>;
  deleteCut(id: number): Promise<ApiResponse<ICutInterface | null>>;
}

export default class CutService implements ICutService {
  constructor(private CutRepository: ICutRepository) {}

  async getCutById(id: number): Promise<ApiResponse<ICutInterface[]>> {
    const res = await this.CutRepository.getCutById(id);

    if (!res) {
      return new ApiResponse(
        {} as ICutInterface[],
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async createCut(Cut: ICutInterface): Promise<ApiResponse<ICutInterface>> {
    const res = await this.CutRepository.createCut(Cut);
    if (!res) {
      return new ApiResponse(
        {} as ICutInterface,
        EResponseCodes.FAIL,
        "Ya existe un Corte para el rango de fechas seleccionadas, por favor verifique"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getCutPaginate(
    filters: ICutFiltersInterface
  ): Promise<ApiResponse<IPagingData<ICutInterface>>> {
    const requeriment = await this.CutRepository.getCutPaginate(filters);
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async updateCut(
    Cut: ICutInterface,
    id: number
  ): Promise<ApiResponse<ICutInterface | null>> {
    const res = await this.CutRepository.updateCut(Cut, id);

    if (!res) {
      return new ApiResponse(
        {} as ICutInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteCut(id: number): Promise<ApiResponse<ICutInterface | null>> {
    const res = await this.CutRepository.deleteCut(id);

    if (!res) {
      return new ApiResponse(
        {} as ICutInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
