import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAbsorptionPercentaje,
  IAbsortionPercentageCreateSchema,
  IAbsortionPercentageFullCreateSchema,
  IAbsortionPercentagePaginatedFilters,
  IAbsortionPercentagePayload,
  IAbsortionPercentageUpdateSchema,
} from "App/Interfaces/AbsorptionPercentage";
import { ISelectData } from "App/Interfaces/Common";
import { IAbsorptionPercentageRepository } from "App/Repositories/AbsorptionPercentageRepository";
import { ICallBudgetRepository } from "App/Repositories/Sapiencia/CallBudgetRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import Env from "@ioc:Adonis/Core/Env";
import { ENV_NAMES } from "App/Utils/helpers";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  absorptionPercentageXLSXColumns,
  absorptionPercentageXLSXFilePath,
  absorptionPercentageXLSXRows,
} from "./XLSX";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";

export interface IAbsorptionPercentageService {
  createAbsortionPercentage(
    payload: IAbsortionPercentageCreateSchema
  ): Promise<
    ApiResponse<
      Omit<
        IAbsortionPercentageFullCreateSchema,
        "userCreated" | "updatedAt" | "createdAt" | "absorptionItems"
      >[]
    >
  >;
  getCommuneResources(): Promise<ApiResponse<ISelectData[]>>;
  getAllAbsorptionPercentagePaginated(
    filters: IAbsortionPercentagePaginatedFilters
  ): Promise<
    ApiResponse<
      IPagingData<
        Omit<
          IAbsorptionPercentaje,
          "userModified" | "updatedAt" | "userCreated" | "createdAt"
        >
      >
    >
  >;
  updateAbsorptionPercentageById(
    id: number,
    payload: IAbsortionPercentageUpdateSchema
  ): Promise<ApiResponse<IAbsorptionPercentaje>>;
  deleteAbsorptionPercentageById(id: number): Promise<ApiResponse<null>>;
  generateAbsorptionPercentageXLSX(
    filters: IAbsortionPercentagePaginatedFilters
  ): Promise<ApiResponse<string>>;
}

export default class AbsorptionPercentageService
  implements IAbsorptionPercentageService
{
  constructor(
    private absorptionPercentageRepository: IAbsorptionPercentageRepository,
    private callBudgetRepository: ICallBudgetRepository,
    private callPeriodRepository: ICallPeriodRepository
  ) {}
  // GET COMMUNE RESOURCES
  public async getCommuneResources() {
    const communeResourcesFound =
      await this.callBudgetRepository.getAllCommuneResources();
    const communeResourcesFoundMutated = communeResourcesFound.map((el) => ({
      name: el.comuna.toString(),
      value: Number(el.recurso),
    }));
    return new ApiResponse(communeResourcesFoundMutated, EResponseCodes.OK);
  }
  // CREATE AN ABSORPTION PERCENTAGE
  public async createAbsortionPercentage(
    payload: IAbsortionPercentageCreateSchema
  ) {
    const {
      sceneryPercentage1,
      sceneryPercentage2,
      sceneryPercentage3,
      absorptionItems,
    } = payload;
    let absorptionPercentagesPromises: Promise<
      Omit<
        IAbsortionPercentageFullCreateSchema,
        "userCreated" | "updatedAt" | "createdAt" | "absorptionItems"
      >
    >[] = [];
    for (let item of absorptionItems) {
      const { resource } = item;
      const absorptionPercentageCreatedPromise =
        this.absorptionPercentageRepository.createAbsortionPercentage({
          ...item,
          ...payload,
          sceneryValue1: resource * sceneryPercentage1,
          sceneryValue2: resource * sceneryPercentage2,
          sceneryValue3: resource * sceneryPercentage3,
          userCreated: Env.get(ENV_NAMES.CURRENT_USER_DOCUMENT),
        });
      absorptionPercentagesPromises.push(absorptionPercentageCreatedPromise);
    }
    const absorptionPercentagesCreated = await Promise.all(
      absorptionPercentagesPromises
    );
    return new ApiResponse(absorptionPercentagesCreated, EResponseCodes.OK);
  }
  // GET ALL ABSORPTION PERCENTAGE PAGINATED
  public async getAllAbsorptionPercentagePaginated(
    filters: IAbsortionPercentagePaginatedFilters
  ) {
    const absorptionPercentageFound =
      await this.absorptionPercentageRepository.getAllAbsorptionPercentagePaginated(
        filters
      );
    return new ApiResponse(absorptionPercentageFound, EResponseCodes.OK);
  }
  // UPDATE ABSORTION PERCENTAGE BY ID
  public async updateAbsorptionPercentageById(
    id: number,
    payload: IAbsortionPercentageUpdateSchema
  ) {
    let temporalAbsortionPercentage: IAbsortionPercentagePayload = {
      ...payload,
      userModified: Env.get(ENV_NAMES.CURRENT_USER_DOCUMENT),
    };
    const {
      resource,
      sceneryPercentage1,
      sceneryPercentage2,
      sceneryPercentage3,
    } = payload;
    if (resource) {
      temporalAbsortionPercentage = {
        ...temporalAbsortionPercentage,
        sceneryValue1: resource * sceneryPercentage1!,
        sceneryValue2: resource * sceneryPercentage2!,
        sceneryValue3: resource * sceneryPercentage3!,
      };
    } else if (sceneryPercentage1 || sceneryPercentage2 || sceneryPercentage3) {
      if (sceneryPercentage1) {
        temporalAbsortionPercentage = {
          ...temporalAbsortionPercentage,
          sceneryValue1: resource! * sceneryPercentage1,
        };
      }
      if (sceneryPercentage2) {
        temporalAbsortionPercentage = {
          ...temporalAbsortionPercentage,
          sceneryValue2: resource! * sceneryPercentage2,
        };
      }
      if (sceneryPercentage3) {
        temporalAbsortionPercentage = {
          ...temporalAbsortionPercentage,
          sceneryValue3: resource! * sceneryPercentage3,
        };
      }
    }
    const absorptionPercentageUpdated =
      await this.absorptionPercentageRepository.updateAbsorptionPercentageById(
        id,
        temporalAbsortionPercentage
      );
    return new ApiResponse(absorptionPercentageUpdated, EResponseCodes.OK);
  }
  // DELETE ABSORPTION PERCENTAGE BY ID
  public async deleteAbsorptionPercentageById(id: number) {
    await this.absorptionPercentageRepository.deleteAbsorptionPercentageById(
      id
    );
    return new ApiResponse(null, EResponseCodes.OK);
  }
  // GENERATE ABSORPTION PERCENTAGE XLSX
  public async generateAbsorptionPercentageXLSX(
    filters: IAbsortionPercentagePaginatedFilters
  ) {
    const absorptionPercentageFound =
      await this.absorptionPercentageRepository.getAllAbsorptionPercentagePaginated(
        filters
      );
    const periodsData = await this.callPeriodRepository.getAllCallPeriod();
    const periodFound = periodsData.find(
      (el) => el.id === filters.announcementId
    );
    const worksheetName = `PorcentajeAbsorcion[${periodFound?.name}]`;
    await generateXLSX({
      columns: absorptionPercentageXLSXColumns,
      data: absorptionPercentageXLSXRows(absorptionPercentageFound),
      filePath: absorptionPercentageXLSXFilePath,
      worksheetName,
    });
    return new ApiResponse(
      absorptionPercentageXLSXFilePath,
      EResponseCodes.OK,
      worksheetName
    );
  }
}
