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
  createMasterActivity(masterActivity: IMasterActivity): Promise<ApiResponse<IMasterActivity>>;
}

export default class MasterActivityService implements IMasterActivityService {
    constructor(
      private masterActivityRepository: IMasterActivityRepository
    ) {}

     //crear dedudcción manual
     async createMasterActivity(masterActivity: IMasterActivity): Promise<ApiResponse<IMasterActivity>>{
      console.log("***********estoy en service")
      const res = await this.masterActivityRepository.createMasterActivity(masterActivity);
      console.log("***********estoy en service")

      if (!res) {
      return new ApiResponse(
          {} as IMasterActivity ,
          EResponseCodes.FAIL,
          "*Ocurrió un error en su Transacción "
      );
      }
      return new ApiResponse(res, EResponseCodes.OK);
  }

}

