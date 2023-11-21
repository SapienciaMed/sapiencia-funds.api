import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { ICallFound } from "App/Interfaces/CallfundInterfaces";

export interface ISapienciaService {
  getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>>;
  getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>>;
  getAllCallfond(): Promise<ApiResponse<ICallFound[]>>;
  geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>>;
}

export default class SapienciaService implements ISapienciaService {
  constructor(private callPeriodRepository: ICallPeriodRepository) {}

  async getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>> {
    const res = await this.callPeriodRepository.getAllCallPeriod();
    return new ApiResponse(res, EResponseCodes.OK);
  }
  
  async getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>> {
    const res = await this.callPeriodRepository.getAllCallBudget();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllCallfond(): Promise<ApiResponse<ICallFound[]>> {
    const res = await this.callPeriodRepository.getAllCallFond();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>> {
    const Activity =
      await this.callPeriodRepository.geCallBudgetPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }
}
