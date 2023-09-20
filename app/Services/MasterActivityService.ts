import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
//import { IProgramTypes } from "App/Interfaces/TypesProgramInterface";
import {
    IMasterActivity,
    //IMasterActivityFilters,
} from "App/Interfaces/MasterActivityInterface";
import { IMasterActivityRepository } from "App/Repositories/MasterActivityRepository";
import { ApiResponse, 
        //IPagingData 
} from "App/Utils/ApiResponses";

export interface IMasterActivityService {
    getMasterActivityById(id: string): Promise<ApiResponse<IMasterActivity>>;
}

export default class MasterActivityService implements IMasterActivityService {
    constructor(
      private masterActivityRepository: IMasterActivityRepository
    ) {}

    async getMasterActivityById(id: string): Promise<ApiResponse<IMasterActivity>> {
        const res = await this.masterActivityRepository.getMasterActivityById(id);
    
        if (!res) {
          return new ApiResponse(
            {} as IMasterActivity,
            EResponseCodes.FAIL,
            "Registro no encontrado"
          );
        }
    
        return new ApiResponse(res, EResponseCodes.OK);
      }
}

