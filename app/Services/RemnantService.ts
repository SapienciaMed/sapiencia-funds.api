import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IRemnant, IRemnantFilters, IRemnantUpdate } from "App/Interfaces/IRemnantInterface";
import { IMaster } from "App/Interfaces/MasterInterface";
import { IRemnantRepository } from "App/Repositories/RemnantRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";


export interface IRemnantService {
    getallRemnantsPaginated(filters: IRemnantFilters): Promise<ApiResponse<IPagingData<IRemnant>>>;
    getRemnantById(id:number): Promise<ApiResponse<IRemnant>>;
    updateRemnan(id: number,remnant: IRemnantUpdate): Promise<ApiResponse<IRemnant>>;

    getMasterList(): Promise<ApiResponse<IMaster[]>>;
    createMaster(master: IMaster): Promise<ApiResponse<IMaster>>;
    /* getMasterActivityPaginate(filters: IMasterActivityFilters): Promise<ApiResponse<IPagingData<IMasterActivity>>>; */
}

export default class RemnantService implements IRemnantService {

    constructor(
        private remnantRepository: IRemnantRepository
    ) { }

    async getallRemnantsPaginated(filters: IRemnantFilters): Promise<ApiResponse<IPagingData<any>>> {
        let remnants = await this.remnantRepository.getallRemnantsPaginated(filters);
        
        if (Array.isArray(remnants.array) && remnants.array.length === 0) {            
            remnants = await this.remnantRepository.importRemnants(filters)
            return this.getallRemnantsPaginated(filters);
        } 
        
        return new ApiResponse(remnants, EResponseCodes.OK);
        
    }
    
    async getRemnantById(id: number): Promise<ApiResponse<IRemnant>> {
        const res = await this.remnantRepository.getRemnantById(id);

    if (!res) {
      return new ApiResponse(
        {} as IRemnant,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
    }

    async updateRemnan(id: number,remnant: IRemnantUpdate): Promise<ApiResponse<IRemnant>> {
        const res = await this.remnantRepository.updateRemnan(id,remnant);
        if (!res) {
          return new ApiResponse(
            {} as IRemnant,
            EResponseCodes.FAIL,
            "El registro indicado no existe"
          );
        }
    
        return new ApiResponse(res, EResponseCodes.OK);
      }





    async createMaster(master: IMaster): Promise<ApiResponse<IMaster>> {
        const res = await this.remnantRepository.createMaster(master);
        if (!res) {
            return new ApiResponse(
                {} as IMaster,
                EResponseCodes.FAIL,
                "*Ocurrió un error en su Transacción "
            );
        }
        return new ApiResponse(res, EResponseCodes.OK);
    }

    async getMasterList(): Promise<ApiResponse<IMaster[]>> {
        const res = await this.remnantRepository.getMasterList();

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