import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFiduciaRepository } from "App/Repositories/FiduciaRepository";

export interface IFiduciaService {    
  getFiduciaList(): Promise<ApiResponse<any[]>>; 
}

export default class FiduciaService implements IFiduciaService {

    constructor( private fiduciaRepository: IFiduciaRepository){}

    async getFiduciaList(): Promise<ApiResponse<any[]>> {
        const res = await this.fiduciaRepository.getFiduciaList();
    
        if (!res) {
          return new ApiResponse(
            {} as any[],
            EResponseCodes.FAIL,
            "Registro no encontrado"
          );
        }
    
        return new ApiResponse(res, EResponseCodes.OK);
      }
    
}
