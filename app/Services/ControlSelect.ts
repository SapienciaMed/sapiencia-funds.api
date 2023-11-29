import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { controlSelectConsolidado, controlSelectFilter, controlSelectFilterPag } from "App/Interfaces/ControlSelectInterface";
import ControlSelectRepository from "App/Repositories/ControlSelectRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IControlSelectService {
    getInfopay(payload: controlSelectFilterPag): Promise<ApiResponse<any>>
    getinfoConsolidate(payload: controlSelectFilter): Promise<ApiResponse<any>>
    updateinfoConsolidado(payload: controlSelectConsolidado): Promise<ApiResponse<any>>
    createInfoConsolidado(payload: controlSelectConsolidado): Promise<ApiResponse<any>>
    getInfoLegalization(payload: controlSelectFilter): Promise<ApiResponse<any>>
    getInfoControl(payload: controlSelectFilter): Promise<ApiResponse<any>>
    updateInfoLegalization(payload: any): Promise<ApiResponse<any>>
}
export default class ControlSelectServices implements IControlSelectService {
    constructor(private controlSelectRepository: ControlSelectRepository) { }

    async getinfoConsolidate(payload: controlSelectFilter) {
        await this.controlSelectRepository.getInfoConsolidate(payload)
        const res = await this.controlSelectRepository.getInfoBeforeCreate(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async updateinfoConsolidado(payload: any) {
        const res = await this.controlSelectRepository.updateinfoConsolidado(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }
    async createInfoConsolidado(payload: controlSelectConsolidado) {
        const res = await this.controlSelectRepository.createInfoConsolidado(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async getInfoLegalization(payload: controlSelectFilter) {
        const res = await this.controlSelectRepository.getInfoLegalization(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }
    async getInfoControl(payload: controlSelectFilter) {
        const res = await this.controlSelectRepository.getInfoControl(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async updateInfoLegalization(payload: any) {
        const res = await this.controlSelectRepository.updateInfoLegalization(payload)
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async getInfopay(payload: controlSelectFilterPag) {
        const accountStatementsFound =
            await this.controlSelectRepository.getInfopay(
                payload
            );
        //const res = await this.controlSelectRepository.getInfopay(payload)
        return new ApiResponse(accountStatementsFound, EResponseCodes.OK)
    }

}