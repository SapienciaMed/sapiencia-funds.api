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
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { DateTime } from "luxon";

export interface ILegalizedService {
  updateLegalizedComunneBudget(
    payload: ILegalizedPayload
  ): Promise<ApiResponse<ILegalized>>;
  getAllLegalized(
    filters: ILegalizedPaginatedFilters
  ): Promise<ApiResponse<(ILegalizedItem & { updatedAt: DateTime | null })[]>>;
  generateLegalizedXLSX(
    filters: ILegalizedPaginatedFilters
  ): Promise<ApiResponse<string>>;
}

export default class LegalizedService implements ILegalizedService {
  constructor(
    private legalizedRepository: ILegalizedRepository,
    private callBudgetRepository: ICallBudgetRepository,
    private callPeriodRepository: ICallPeriodRepository
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
    let legalizedFoundMutated: (ILegalizedItem & {
      updatedAt: DateTime | null;
    })[] = [];
    const legalizedFoundMutatedPromises: Promise<ILegalized | null>[] = [];
    legalizedFound.map((legalizedData) => {
      const { announcementId, communeFundId, fiduciaryId } = legalizedData;
      const auxLegalizedPromise =
        this.legalizedRepository.getLegalizedInfoByFilters({
          announcementId,
          communeFundId,
          fiduciaryId,
        });
      legalizedFoundMutatedPromises.push(auxLegalizedPromise);
    });
    const legalizedFoundMutatedPromisesResolved = await Promise.all(
      legalizedFoundMutatedPromises
    );
    legalizedFoundMutated = legalizedFound.map((legalizedDate, index) => {
      let updatedAt: null | DateTime = null;
      const dateFound = legalizedFoundMutatedPromisesResolved?.[index];
      if (dateFound !== null) updatedAt = dateFound.updatedAt;
      return {
        ...legalizedDate,
        updatedAt,
      };
    });

    return new ApiResponse(legalizedFoundMutated, EResponseCodes.OK);
  }
  // GENERATE LEGALIZED XLSX
  public async generateLegalizedXLSX(filters: ILegalizedPaginatedFilters) {
    const legalizedFound =
      await this.callBudgetRepository.getCommuneBudgetByPeriod(filters);
    const periodsData = await this.callPeriodRepository.getAllCallPeriod();
    const periodFound = periodsData.find(
      (el) => el.id === filters.announcementId
    );
    const worksheetName = `Legalizado[${periodFound?.name}]`;
    await generateXLSX({
      columns: legalizedXLSXColumns,
      data: legalizedXLSXRows(legalizedFound),
      filePath: legalizedXLSXFilePath,
      worksheetName,
    });
    return new ApiResponse(
      legalizedXLSXFilePath,
      EResponseCodes.OK,
      worksheetName
    );
  }
}
