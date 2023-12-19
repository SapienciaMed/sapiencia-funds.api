import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IRemnant, IRemnantFilters, IRemnantUpdate } from "App/Interfaces/IRemnantInterface";
import { IRemnantRepository } from "App/Repositories/RemnantRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";


export interface IRemnantService {
    getallRemnantsPaginated(filters: IRemnantFilters): Promise<ApiResponse<IPagingData<IRemnant>>>;
    getRemnantById(id: number): Promise<ApiResponse<IRemnant>>;
    updateRemnan(id: number, remnant: IRemnantUpdate): Promise<ApiResponse<IRemnant>>;
    deleteRemnan(id: number): Promise<ApiResponse<boolean>>;
   
}

export default class RemnantService implements IRemnantService {

    constructor(
        private remnantRepository: IRemnantRepository
    ) { }

    async getallRemnantsPaginated(
        filters: IRemnantFilters,
        retryCount = 0 // Parámetro adicional para controlar el número de reintentos
    ): Promise<ApiResponse<IPagingData<any>>> {
        let remnants = await this.remnantRepository.getallRemnantsPaginated(filters);
    
        if (Array.isArray(remnants.array) && remnants.array.length === 0) {
            if (retryCount < 1) { // Limita el número de reintentos
                remnants = await this.remnantRepository.importRemnants(filters);
                return this.getallRemnantsPaginated(filters, retryCount + 1);
            } else {               
                return new ApiResponse(remnants, EResponseCodes.OK);
            }
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

    async updateRemnan(id: number, remnant: IRemnantUpdate): Promise<ApiResponse<IRemnant>> {
        const res = await this.remnantRepository.updateRemnan(id, remnant);
        if (!res) {
            return new ApiResponse(
                {} as IRemnant,
                EResponseCodes.FAIL,
                "El registro indicado no existe"
            );
        }

        return new ApiResponse(res, EResponseCodes.OK);
    }

    async deleteRemnan(id: number): Promise<ApiResponse<boolean>> {
        const res = await this.remnantRepository.deleteRemnan(id);

        if (!res) {
            return new ApiResponse(
                false,
                EResponseCodes.FAIL,
                "El registro indicado no existe"
            );
        }

        return new ApiResponse(true, EResponseCodes.OK);
    }

}