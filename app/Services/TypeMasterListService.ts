import { ITypeMasterList } from "App/Interfaces/TypeMasterListinterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ITypeMasterListRepository } from '../Repositories/TypeMasterListRepository';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

export interface ITypeMasterListService {    
    getTypeMasterList(): Promise<ApiResponse<ITypeMasterList[]>>; 
}

export default class TypeMasterListService implements ITypeMasterListService {

    constructor( private typeMasterListRepository: ITypeMasterListRepository){}

    async getTypeMasterList(): Promise<ApiResponse<ITypeMasterList[]>> {
        const res = await this.typeMasterListRepository.getTypeMasterList();
    
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
