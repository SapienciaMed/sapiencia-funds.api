import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IMaster, IMasterFilters } from "App/Interfaces/MasterInterface";
import { IMasterRepository } from "App/Repositories/MasterRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";


export interface IMasterService {
    createMaster(master: IMaster): Promise<ApiResponse<IMaster>>;
    getMasterPaginate(filters: IMasterFilters): Promise<ApiResponse<IPagingData<IMaster>>>;
    getMasterList(): Promise<ApiResponse<IMaster[]>>;
    /* getMasterActivityPaginate(filters: IMasterActivityFilters): Promise<ApiResponse<IPagingData<IMasterActivity>>>; */
}

export default class MasterService implements IMasterService {

    constructor(
        private masterRepository: IMasterRepository
    ) { }

    //crear maestro 
    async createMaster(master: IMaster): Promise<ApiResponse<IMaster>> {
        const res = await this.masterRepository.createMaster(master);
        if (!res) {
            return new ApiResponse(
                {} as IMaster,
                EResponseCodes.FAIL,
                "*Ocurrió un error en su Transacción "
            );
        }
        return new ApiResponse(res, EResponseCodes.OK);
    }

    async getMasterPaginate(
        filters: IMasterFilters
    ): Promise<ApiResponse<IPagingData<IMaster>>> {
        const Activity =
            await this.masterRepository.getMasterPaginate(filters);
        return new ApiResponse(Activity, EResponseCodes.OK);
    }

    async getMasterList(): Promise<ApiResponse<IMaster[]>> {
        const res = await this.masterRepository.getMasterList();

        if (!res) {
            return new ApiResponse(
                {} as IMaster[],
                EResponseCodes.FAIL,
                "Registro no encontrado"
            );
        }

        return new ApiResponse(res, EResponseCodes.OK);
    }

}