import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IActa } from "App/Interfaces/ActaInterface";
import { IActaRepository } from "App/Repositories/ActaRepository";
import { ApiResponse } from "App/Utils/ApiResponses";


export interface IActaService {
    createActa(acta: IActa): Promise<ApiResponse<IActa>>;
    getActa(id: number): Promise<ApiResponse<IActa>>
    approveCitation(id: number)
    lastInsertId()
    updateActa(acta)
}

export default class ActaService implements IActaService {

    constructor(private actaRepository: IActaRepository) { }

    async createActa(acta: IActa): Promise<ApiResponse<IActa>> {
        const res = await this.actaRepository.createActa(acta);
        if (!res) {
            return new ApiResponse(
                {} as IActa,
                EResponseCodes.FAIL,
                "*Ocurrió un error en su Transacción "
            );
        }
        return new ApiResponse(res, EResponseCodes.OK);
    }


    async getActa(id: number) {
        const res = await this.actaRepository.getActa(id)
        return new ApiResponse(res, EResponseCodes.OK)
    }


    async approveCitation(id: number) {
        const res = await this.actaRepository.approveCitation(id)
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async lastInsertId() {
        const res = await this.actaRepository.lastInsertId()
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async updateActa(acta: IActa): Promise<ApiResponse<IActa>> {
        const res = await this.actaRepository.updateActa(acta)
        if (!res) {
            return new ApiResponse(
                {} as IActa,
                EResponseCodes.FAIL,
                "*Ocurrió un error en su Transacción "
            );
        }
        return new ApiResponse(res, EResponseCodes.OK);
    }
}