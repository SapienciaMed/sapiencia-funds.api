import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
//import { IProgramTypes } from "App/Interfaces/TypesProgramInterface";
import {
    IMasterActivity,
    IMasterActivityFilters,
} from "App/Interfaces/MasterActivityInterface";
import { IMasterActivityRepository } from "App/Repositories/MasterActivityRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";


export interface IMasterActivityService {
  createMasterActivity(masterActivity: IMasterActivity): Promise<ApiResponse<IMasterActivity>>;
  getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<ApiResponse<IPagingData<IMasterActivity>>>;
}

export default class MasterActivityService implements IMasterActivityService {
    constructor(
      private masterActivityRepository: IMasterActivityRepository
    ) {}

     //crear maestro actividad
     async createMasterActivity(masterActivity: IMasterActivity): Promise<ApiResponse<IMasterActivity>>{
      const res = await this.masterActivityRepository.createMasterActivity(masterActivity);
      if (!res) {
      return new ApiResponse(
          {} as IMasterActivity ,
          EResponseCodes.FAIL,
          "*Ocurrió un error en su Transacción "
      );
      }
      return new ApiResponse(res, EResponseCodes.OK);
  }

  async getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<ApiResponse<IPagingData<IMasterActivity>>> {
    const vacations =
      await this.masterActivityRepository.getMasterActivityPaginate(filters);
    return new ApiResponse(vacations, EResponseCodes.OK);
  }

}

