import { ITypeMasterList } from "App/Interfaces/TypeMasterListinterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IStatusListRepository } from "App/Repositories/StatusListRepository";

export interface IStatusListService {    
  getStatusList(): Promise<ApiResponse<ITypeMasterList[]>>; 
}

export default class StatusListService implements IStatusListService {

    constructor( private statusListRepository: IStatusListRepository){}

    async getStatusList(): Promise<ApiResponse<ITypeMasterList[]>> {
        const res = await this.statusListRepository.getStatusList();
    
        if (!res) {
          return new ApiResponse(
            {} as ITypeMasterList[],
            EResponseCodes.FAIL,
            "Registro no encontrado"
          );
        }
    
        return new ApiResponse(res, EResponseCodes.OK);
      }
    
}
