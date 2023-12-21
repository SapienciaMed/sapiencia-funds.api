import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ILegalizedItem,
  ILegalizedPaginatedFilters,
} from "App/Interfaces/Legalized";
import { ILegalizedRepository } from "App/Repositories/LegalizedRepository";
import { ICallBudgetRepository } from "App/Repositories/Sapiencia/CallBudgetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface ILegalizedService {
  getAllLegalized(
    filters: ILegalizedPaginatedFilters
  ): Promise<ApiResponse<ILegalizedItem[]>>;
}

export default class LegalizedService implements ILegalizedService {
  constructor(
    private legalizedRepository: ILegalizedRepository,
    private callBudgetRepository: ICallBudgetRepository
  ) {}
  // GET ALL LEGALIZED PAGINATED
  public async getAllLegalized(filters: ILegalizedPaginatedFilters) {
    console.log(this.legalizedRepository.toString());
    const legalizedFound =
      await this.callBudgetRepository.getCommuneBudgetByPeriod(filters);
    return new ApiResponse(legalizedFound, EResponseCodes.OK);
  }
}
