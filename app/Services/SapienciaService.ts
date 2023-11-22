import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { IConsolidationTrayForTechnicianCollection } from '../Interfaces/ConsolidationTrayInterface';
import { IConsolidationTrayTechnicianCollectionRepository } from '../Repositories/Sapiencia/ConsolidationTrayTechnicianCollectionRepository';
import { ICutInterface } from '../Interfaces/CutInterface';

export interface ISapienciaService {
  getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>>;
  getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>>;
  geCallBudgetPaginate(filters: ICallBudgetFilters): Promise<ApiResponse<IPagingData<ICallBudget>>>;
  geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<any>>>;
  getCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[] | null>>;
  geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<any>>>;
}

export default class SapienciaService implements ISapienciaService {
  constructor(
    private callPeriodRepository: ICallPeriodRepository,
    private callConsolidationTrayTechnicianCollectionRepository: IConsolidationTrayTechnicianCollectionRepository,
  ) {}

  async getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>> {
    const res = await this.callPeriodRepository.getAllCallPeriod();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>> {
    const res = await this.callPeriodRepository.getAllCallBudget();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>> {
    const Activity =
      await this.callPeriodRepository.geCallBudgetPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<any>>> {

    const technicianCollection = await this.callConsolidationTrayTechnicianCollectionRepository.geConsolidationTrayTechnicianCollection(filters);
    return new ApiResponse(technicianCollection, EResponseCodes.OK);

  }

  async getCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[] | null>> {

    const res = await this.callConsolidationTrayTechnicianCollectionRepository.getCutGeneric();
    return new ApiResponse(res, EResponseCodes.OK);

  }

  async geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<any>>> {

    const technicianCollection = await this.callConsolidationTrayTechnicianCollectionRepository.geConsolidationTrayTechnicianCollectionByCut(filters);
    return new ApiResponse(technicianCollection, EResponseCodes.OK);

  }

}
