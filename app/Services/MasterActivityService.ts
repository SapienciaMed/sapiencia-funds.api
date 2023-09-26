import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IProgramTypes } from "App/Interfaces/TypesProgramInterface";
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
  getActivitiesList(): Promise<ApiResponse<IMasterActivity[]>>;
  updateMasterActivity(
    activity: IMasterActivity,
    id: number
  ): Promise<ApiResponse<IMasterActivity | null>>;
  getActivityById(id: number): Promise<ApiResponse<IMasterActivity[]>>;
  getProgramList(): Promise<ApiResponse<IProgramTypes[]>>;
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

  async getActivitiesList(): Promise<ApiResponse<IMasterActivity[]>> {
    const res = await this.masterActivityRepository.getActivityList();

    if (!res) {
      return new ApiResponse(
        {} as IMasterActivity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getProgramList(): Promise<ApiResponse<IProgramTypes[]>> {
    const res = await this.masterActivityRepository.getProgramList();

    if (!res) {
      return new ApiResponse(
        {} as IProgramTypes[],
        EResponseCodes.FAIL,
        "Registro no encontrado....."
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getMasterActivityPaginate(
    filters: IMasterActivityFilters
  ): Promise<ApiResponse<IPagingData<IMasterActivity>>> {
    const Activity =
      await this.masterActivityRepository.getMasterActivityPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async getActivityById(
    id: number
  ): Promise<ApiResponse<IMasterActivity[]>> {
    const res = await this.masterActivityRepository.getActivityById(id);

    if (!res) {
      return new ApiResponse(
        {} as IMasterActivity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async updateMasterActivity(
    activity: IMasterActivity,
    id: number
  ): Promise<ApiResponse<IMasterActivity | null>>{
    const res = await this.masterActivityRepository.updateMasterActivity(
      activity,
      id
    );

    if (!res) {
      return new ApiResponse(
        {} as IMasterActivity,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

}

