import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  ILegalized,
  ILegalizedItem,
  ILegalizedPaginatedFilters,
  ILegalizedPayload,
} from "App/Interfaces/Legalized";
import { ILegalizedRepository } from "App/Repositories/LegalizedRepository";
import { ICallBudgetRepository } from "App/Repositories/Sapiencia/CallBudgetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  legalizedXLSXColumns,
  legalizedXLSXFilePath,
  legalizedXLSXRows,
} from "./XLSX";

export interface ILegalizedService {
  updateLegalizedComunneBudget(
    payload: ILegalizedPayload
  ): Promise<ApiResponse<ILegalized>>;
  getAllLegalized(
    filters: ILegalizedPaginatedFilters
  ): Promise<ApiResponse<ILegalizedItem[]>>;
  generateLegalizedXLSX(
    filters: ILegalizedPaginatedFilters
  ): Promise<ApiResponse<string>>;
}

export default class LegalizedService implements ILegalizedService {
  constructor(
    private legalizedRepository: ILegalizedRepository,
    private callBudgetRepository: ICallBudgetRepository
  ) {}
  // CREATE LEGALIZED
  public async updateLegalizedComunneBudget(payload: ILegalizedPayload) {
    const wasUpdated = await this.callBudgetRepository.updateCommuneBudget(
      payload
    );
    let legalizedCreated = {} as ILegalized;
    if (wasUpdated) {
      legalizedCreated = await this.legalizedRepository.createLegalized(
        payload
      );
    }
    return new ApiResponse(legalizedCreated, EResponseCodes.OK);
  }
  public async getAllLegalized(filters: ILegalizedPaginatedFilters) {
    const legalizedFound =
      await this.callBudgetRepository.getCommuneBudgetByPeriod(filters);
    return new ApiResponse(legalizedFound, EResponseCodes.OK);
  }
  // GENERATE LEGALIZED XLSX
  public async generateLegalizedXLSX(filters: ILegalizedPaginatedFilters) {
    const legalizedFound =
      await this.callBudgetRepository.getCommuneBudgetByPeriod(filters);
    await generateXLSX({
      columns: legalizedXLSXColumns,
      data: legalizedXLSXRows(legalizedFound),
      filePath: legalizedXLSXFilePath,
      worksheetName: "LEGALIZADOS",
    });
    return new ApiResponse(legalizedXLSXFilePath, EResponseCodes.OK);
  }
}
