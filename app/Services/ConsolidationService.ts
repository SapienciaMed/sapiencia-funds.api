import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IConsolidationInterface } from "App/Interfaces/ConsolidationInterface";
import { IConsolidationRepository } from "App/Repositories/ConsolidationRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IConsolidationService {
  createConsolidationByState();
  createConsolidationBiannual();
}

export default class ConsolidationService implements IConsolidationService {
  constructor(private ConsolidationRepository: IConsolidationRepository) {}

  async createConsolidationByState() {
    const res = await this.ConsolidationRepository.createConsolidationByState();
    if (!res) {
      return new ApiResponse(
        {} as IConsolidationInterface,
        EResponseCodes.FAIL,
        "Error en el metodo createConsolidationByState service"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createConsolidationBiannual() {
    const res =
      await this.ConsolidationRepository.createConsolidationBiannual();
    if (!res) {
      return new ApiResponse(
        {} as IConsolidationInterface,
        EResponseCodes.FAIL,
        "Error en el metodo create Consolidation Biannual service"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
