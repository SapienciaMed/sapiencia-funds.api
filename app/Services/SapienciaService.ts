import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import { ICallBudget,
         ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { ApiResponse,
         IPagingData } from "App/Utils/ApiResponses";
import { IConsolidationTrayForTechnicianCollection,
         IConsolidationTrayForTechnicianCollectionParams,
         IConsolidationTrayForTransactions } from '../Interfaces/ConsolidationTrayInterface';
import { IConsolidationTrayTechnicianCollectionRepository } from '../Repositories/Sapiencia/ConsolidationTrayTechnicianCollectionRepository';
import { ICutInterface } from '../Interfaces/CutInterface';
import { ICallFound } from "App/Interfaces/CallfundInterfaces";
import { PqrsdfResultSimple } from '../Interfaces/ConsolidationTrayInterface';

export interface ISapienciaService {
  getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>>;
  getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>>;
  getAllCallfond(): Promise<ApiResponse<ICallFound[]>>;
  geCallBudgetPaginate(filters: ICallBudgetFilters): Promise<ApiResponse<IPagingData<ICallBudget>>>;

  geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>>;
  getCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[] | null>>;
  geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>>;
  geBeneficiaryById(id: number): Promise<ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>>;
  updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>>;
  getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<PqrsdfResultSimple[] | null>>;

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

  async geBeneficiaryById(id: number): Promise<ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>> {

    const getBeneficiary = await this.callConsolidationTrayTechnicianCollectionRepository.geBeneficiaryById(id);
    if(!getBeneficiary || getBeneficiary == null) return new ApiResponse(null, EResponseCodes.FAIL, "No se encontró información");
    return new ApiResponse(getBeneficiary, EResponseCodes.OK, "Información encontrada");

  }

  async updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>> {

    const technicianTransaction = await this.callConsolidationTrayTechnicianCollectionRepository.updateCutBeneficiary(data);

    if( !technicianTransaction || technicianTransaction == null )
      return new ApiResponse(null, EResponseCodes.FAIL, "No se pudo actualizar el corte");

    return new ApiResponse(technicianTransaction, EResponseCodes.OK, "Se actualizó el corte para el beneficiario");

  }

  async getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<PqrsdfResultSimple[] | null>> {

    const getGetPQRSDF = await this.callConsolidationTrayTechnicianCollectionRepository.getPQRSDFExternal(filters);
    if( !getGetPQRSDF || getGetPQRSDF == null )
      return new ApiResponse(null, EResponseCodes.FAIL, "No se encontró información u ocurrió un error");

    return new ApiResponse(getGetPQRSDF, EResponseCodes.OK, "Listado de PQRSDF");

  }

}
