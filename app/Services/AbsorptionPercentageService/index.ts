import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAbsorptionPercentaje,
  IAbsortionPercentageCreateSchema,
} from "App/Interfaces/AbsorptionPercentage";
import { ISelectData } from "App/Interfaces/Common";
import { IAbsorptionPercentageRepository } from "App/Repositories/AbsorptionPercentageRepository";
import { ICallBudgetRepository } from "App/Repositories/Sapiencia/CallBudgetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ENV } from "App/Utils/helpers";

export interface IAbsorptionPercentageService {
  createAbsortionPercentage(
    payload: IAbsortionPercentageCreateSchema
  ): Promise<ApiResponse<IAbsorptionPercentaje>>;
  getCommuneResources(): Promise<ApiResponse<ISelectData[]>>;
}

export default class AbsorptionPercentageService
  implements IAbsorptionPercentageService
{
  constructor(
    private absorptionPercentageRepository: IAbsorptionPercentageRepository,
    private callBudgetRepository: ICallBudgetRepository
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
      communeFundId,
      sceneryPercentage1,
      sceneryPercentage2,
      sceneryPercentage3,
    } = payload;
    const resourceFound =
      await this.callBudgetRepository.getResourceByCommuneId(communeFundId);
    const resourceFoundParsed = Number(resourceFound.recurso);
    const absorptionPercentageCreated =
      await this.absorptionPercentageRepository.createAbsortionPercentage({
        ...payload,
        resource: resourceFoundParsed,
        sceneryValue1: resourceFoundParsed * sceneryPercentage1,
        sceneryValue2: resourceFoundParsed * sceneryPercentage2,
        sceneryValue3: resourceFoundParsed * sceneryPercentage3,
        userCreated: ENV.CURRENT_USER_DOCUMENT,
      });
    return new ApiResponse(absorptionPercentageCreated, EResponseCodes.OK);
  }
}
