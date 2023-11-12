import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IResourcePrioritizationRepository } from "App/Repositories/ResourcePrioritizationRepository";
import { IItemsFilters } from "App/Interfaces/ItemInterface";
import { IResourcePrioritization } from "App/Interfaces/ResourcePrioritizationInterface";

export interface IResourcePrioritizationService {
  getResourcePrioritizationPaginate(
    filters: IItemsFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritization>>>;
}

export default class ResourcePrioritizationService
  implements IResourcePrioritizationService
{
  constructor(
    private resourcePrioritizationRepository: IResourcePrioritizationRepository
  ) {}

  async getResourcePrioritizationPaginate(
    filters: IItemsFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritization>>> {
    const items =
      await this.resourcePrioritizationRepository.getResourcePrioritizationPaginated(
        filters
      );

    const toReturn: IResourcePrioritization[] = [];

    for (const item of items.array) {
      // const operatingCostAndExpense = Number(
      //   (item.costTotal * ((item.generalRate || 0) / 100)).toFixed(2)
      // );

      // toReturn.push({
      //   programId: 0,
      //   projectNumber: 0,
      //   validityYear: 0,
      //   communeId: String(item.votingResult?.communeNeighborhood),
      //   percentage123: Number(item.percentage123),
      //   percentage456: Number(item.percentage456),
      //   value: item.costTotal,
      //   places: item.amount,
      //   averageCost: item.averageCost || 0,
      //   generalRate: item.generalRate || 0,
      //   operatingCostAndExpense,
      //   grossValue: item.costTotal - operatingCostAndExpense,
      //   financialPerformances: item.financialPerformances || 0,
      //   balanceResources: item.balanceResources || 0,
      //   operatorCommissionAct: item.votingResult?.operatorCommission || 0,
      //   operatorCommissionBalance:
      //     item.votingResult?.operatorCommissionBalance || 0,
      //   operatorCommission: item.votingResult?.operatorCommission || 0,
      //   resourceForCredit:
      //     item.costTotal -
      //     operatingCostAndExpense +
      //     (item.votingResult?.operatorCommissionBalance || 0) +
      //     (item.votingResult?.operatorCommission || 0),
      // });
    }

    return new ApiResponse(
      {
        array: toReturn,
        meta: items.meta,
      },
      EResponseCodes.OK
    );
  }
}
