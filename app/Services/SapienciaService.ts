import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface ISapienciaService {
  getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>>;
}

export default class SapienciaService implements ISapienciaService {
  constructor(private callPeriodRepository: ICallPeriodRepository) {}

  async getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>> {
    const res = await this.callPeriodRepository.getAllCallPeriod();
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
