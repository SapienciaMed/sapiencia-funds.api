import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IServiceSocialRepository } from "App/Repositories/ServiceSocialRepository";
import { ApiResponse } from "App/Utils/ApiResponses";



export interface IServiceSocialService {   
    import(): Promise<ApiResponse<any[]>>;   
}


export default class ServiceSocialService implements IServiceSocialService {

    constructor(
        private serviceSocialRepository: IServiceSocialRepository
    ) { }
   

    async import(): Promise<ApiResponse<any[]>> {
        const res = await this.serviceSocialRepository.import();

        if (!res) {
            return new ApiResponse(
                {} as any[],
                EResponseCodes.FAIL,
                "Registro no encontrado"
            );
        }

        //console.log(res)

        return new ApiResponse(res, EResponseCodes.OK);
    }

}