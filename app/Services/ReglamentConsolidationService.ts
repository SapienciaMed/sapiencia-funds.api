import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IReglamentConsolidationRepository } from "App/Repositories/ReglamentConsolidationRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ICallPeriodSapi, IReglamentConsolidation } from '../Interfaces/SapienciaGenericInterface';

export interface IReglamenConsolidationtService {

  getPeriodsSapi(): Promise<ApiResponse<ICallPeriodSapi[]>>;
  createReglament(data: any): Promise<ApiResponse<IReglamentConsolidation | null>>;

}

export default class ReglamentConsolidationService implements IReglamenConsolidationtService {

  constructor(
    private reglamentConsolidationRepository: IReglamentConsolidationRepository,
  ) {}

  async getPeriodsSapi(): Promise<ApiResponse<ICallPeriodSapi[]>> {

    const getResult = await this.reglamentConsolidationRepository.getPeriodsSapi();
    return new ApiResponse(getResult, EResponseCodes.OK, "Obteniendo periodos desde Sapiencia");

  }

  async createReglament(data: IReglamentConsolidation): Promise<ApiResponse<IReglamentConsolidation | null>> {

    const res = await this.reglamentConsolidationRepository.createReglament(data);

    if (!res) return new ApiResponse({} as any, EResponseCodes.FAIL,  "*Ocurrió un error en su Transacción");

    return new ApiResponse(res, EResponseCodes.OK, "Reglamento creado!.");
}

}
