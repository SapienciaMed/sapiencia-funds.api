import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IResourcePrioritizationRepository } from "App/Repositories/ResourcePrioritizationRepository";
import {
  IPrioritizationPrintExcel,
  IResourcePrioritization,
  IResourcePrioritizationFilters,
  ITotalsPrioritizationFilters,
} from "App/Interfaces/ResourcePrioritizationInterface";
import { generateExcel } from "App/Utils/generateXLSX";
import CoreService from "./External/CoreService";

export interface IResourcePrioritizationService {
  getResourcePrioritizationExcel(
    filters: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<string>>;
  setResourcePrioritization(
    data: IResourcePrioritization
  ): Promise<ApiResponse<IResourcePrioritization>>;
  getResourcePrioritizationTotals(
    filters: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<IResourcePrioritization>>;
  getResourcePrioritizationPaginate(
    filters: IResourcePrioritizationFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritization>>>;
}

export default class ResourcePrioritizationService
  implements IResourcePrioritizationService
{
  constructor(
    private resourcePrioritizationRepository: IResourcePrioritizationRepository,
    private coreService: CoreService
  ) {}

  async getResourcePrioritizationExcel(
    filters: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<string>> {

    console.log('akive')
    const communeList = await this.coreService.getListByGroupers([
      "COMUNA_CORREGIMIENTO",
    ]);

    console.log(communeList);

    const items =
      await this.resourcePrioritizationRepository.getResourcePrioritizationPaginated(
        {
          ...filters,
          page: 1,
          perPage: 10000,
        }
      );

    const prioritizations =
      await this.resourcePrioritizationRepository.getPrioritizationsToReplace(
        {
          ...filters,
          page: 1,
          perPage: 10000,
        },
        items.array.map((i) => i.communeId)
      );

    const toReturn: IPrioritizationPrintExcel[] = [];

    for (const item of items.array) {
      const toReplace = prioritizations.find(
        (i) => i.communeId == item.communeId
      );

      if (toReplace) {
        toReturn.push({
          "Comuna y/o corregimiento":
            communeList?.find((i) => i.itemCode == String(toReplace.communeId))
              ?.itemDescription || "",
          "Porcentaje 123": Number(toReplace.total123),
          "Porcentaje 456": Number(toReplace.total456),
          Valor: Number(toReplace.value),
          Cupos: Number(toReplace.places),
          "Costo promedio": Number(toReplace.averageCost),
          "Tasa general": Number(toReplace.generalRate),
          "Costo y gasto de operación": Number(
            toReplace.operatingCostAndExpense
          ),
          "Valor bruto": Number(toReplace.grossValue),
          "Recurso del balance": Number(toReplace.balanceResources),
          "Rendimientos financieros": Number(toReplace.financialPerformances),
          "Comisión operador financiero": Number(toReplace.operatorCommission),
          "Comisión operador financiero balance": Number(
            toReplace.operatorCommissionBalance
          ),
          "Comisión operador financiero acta": Number(
            toReplace.operatorCommissionAct
          ),
          "Recurso para crédito": Number(toReplace.resourceForCredit),
        });
      } else {
        toReturn.push({
          "Comuna y/o corregimiento":
            communeList?.find((i) => i.itemCode == String(item.communeId))
              ?.itemDescription || "",
          "Porcentaje 123": Number(item.total123),
          "Porcentaje 456": Number(item.total456),
          Valor: item.value,
          Cupos: item.places,
          "Costo promedio": 0,
          "Tasa general": 0,
          "Costo y gasto de operación": 0,
          "Valor bruto": item.value,
          "Recurso del balance": 0,
          "Rendimientos financieros": 0,
          "Comisión operador financiero": 0,
          "Comisión operador financiero balance": 0,
          "Comisión operador financiero acta": 0,
          "Recurso para crédito": item.value,
        });
      }
    }
    const res = await generateExcel(toReturn);

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async setResourcePrioritization(
    data: IResourcePrioritization
  ): Promise<ApiResponse<IResourcePrioritization>> {
    const res =
      await this.resourcePrioritizationRepository.setResourcePrioritization(
        data
      );

    if (!res) {
      return new ApiResponse(
        {} as IResourcePrioritization,
        EResponseCodes.FAIL,
        data.id
          ? "Hubo un error al actualizar el registro. no se localizo el recurso."
          : "Hubo un error al crear el registro. ya existe uno."
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getResourcePrioritizationTotals(
    filters: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<IResourcePrioritization>> {
    const total1 =
      await this.resourcePrioritizationRepository.getResourcePrioritizationTotals(
        filters
      );

    const total2 =
      await this.resourcePrioritizationRepository.getTotalsWithoutPrioritization(
        filters
      );

    if (!total1) {
      const toReturn: IResourcePrioritization = {
        programId: 0,
        projectNumber: filters.projectNumber,
        validity: filters.validity,
        communeId: 0,
        total123: 0,
        total456: 0,
        value: Number(total2.value),
        places: Number(total2.places),
        averageCost: 0,
        generalRate: 0,
        operatingCostAndExpense: 0,
        grossValue: Number(total2.value),
        financialPerformances: 0,
        balanceResources: 0,
        operatorCommissionAct: 0,
        operatorCommissionBalance: 0,
        operatorCommission: 0,
        resourceForCredit: Number(total2.value),
      };
      return new ApiResponse(toReturn, EResponseCodes.OK);
    } else {
      return new ApiResponse(
        {
          ...total1,
          value: total1.value + Number(total2.value),
          places: total1.places + Number(total2.places),
          grossValue: total1.grossValue + Number(total2.value),
        },
        EResponseCodes.OK
      );
    }
  }

  async getResourcePrioritizationPaginate(
    filters: IResourcePrioritizationFilters
  ): Promise<ApiResponse<IPagingData<IResourcePrioritization>>> {
    const items =
      await this.resourcePrioritizationRepository.getResourcePrioritizationPaginated(
        filters
      );

    const prioritizations =
      await this.resourcePrioritizationRepository.getPrioritizationsToReplace(
        filters,
        items.array.map((i) => i.communeId)
      );

    const toReturn: IResourcePrioritization[] = [];

    for (const item of items.array) {
      const toReplace = prioritizations.find(
        (i) => i.communeId == item.communeId
      );

      if (toReplace) {
        toReturn.push(toReplace);
      } else {
        toReturn.push({
          programId: item.programId,
          projectNumber: filters.projectNumber,
          validity: filters.validity,
          communeId: item.communeId,
          total123: Number(item.total123),
          total456: Number(item.total456),
          value: item.value,
          places: item.places,
          averageCost: 0,
          generalRate: 0,
          operatingCostAndExpense: 0,
          grossValue: item.value,
          financialPerformances: 0,
          balanceResources: 0,
          operatorCommissionAct: 0,
          operatorCommissionBalance: 0,
          operatorCommission: 0,
          resourceForCredit: item.value,
        });
      }
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
