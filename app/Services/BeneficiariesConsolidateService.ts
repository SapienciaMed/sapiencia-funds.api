import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IBeneficiariesConsolidateFiltersInterface,
  IBeneficiariesConsolidateInterface,
} from "App/Interfaces/BeneficiariesConsolidateInterface";
import { IBeneficiariesConsolidateRepository } from "App/Repositories/BeneficiariesConsolidateRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IBeneficiariesConsolidateService {
  getBeneficiariesConsolidateById(
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface[]>>;
  createBeneficiariesConsolidate(
    BeneficiariesConsolidate: IBeneficiariesConsolidateInterface
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface | null>>;
  getBeneficiariesConsolidatePaginate(
    filters: IBeneficiariesConsolidateFiltersInterface
  ): Promise<ApiResponse<IPagingData<IBeneficiariesConsolidateInterface>>>;
  updateBeneficiariesConsolidate(
    requeriment: IBeneficiariesConsolidateInterface,
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface | null>>;
  deleteBeneficiariesConsolidate(
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface | null>>;
}

export default class BeneficiariesConsolidateService
  implements IBeneficiariesConsolidateService
{
  constructor(
    private BeneficiariesConsolidateRepository: IBeneficiariesConsolidateRepository
  ) {}

  async getBeneficiariesConsolidateById(
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface[]>> {
    const res =
      await this.BeneficiariesConsolidateRepository.getBeneficiariesConsolidateById(
        id
      );

    if (!res) {
      return new ApiResponse(
        {} as IBeneficiariesConsolidateInterface[],
        EResponseCodes.FAIL,
        "Recurso no localizado"
      );
    } else {
      return new ApiResponse(res, EResponseCodes.OK);
    }
  }

  async createBeneficiariesConsolidate(
    beneficiaries: IBeneficiariesConsolidateInterface
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface>> {
    const res =
      await this.BeneficiariesConsolidateRepository.createBeneficiariesConsolidate(
        beneficiaries
      );
    if (!res) {
      return new ApiResponse(
        {} as IBeneficiariesConsolidateInterface,
        EResponseCodes.FAIL,
        "Ya existe un Corte para el rango de fechas seleccionadas, por favor verifique"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getBeneficiariesConsolidatePaginate(
    filters: IBeneficiariesConsolidateFiltersInterface
  ): Promise<ApiResponse<IPagingData<IBeneficiariesConsolidateInterface>>> {
    const requeriment =
      await this.BeneficiariesConsolidateRepository.getBeneficiariesConsolidatePaginate(
        filters
      );
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async updateBeneficiariesConsolidate(
    beneficiaries: IBeneficiariesConsolidateInterface,
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface | null>> {
    const res =
      await this.BeneficiariesConsolidateRepository.updateBeneficiariesConsolidate(
        beneficiaries,
        id
      );

    if (!res) {
      return new ApiResponse(
        {} as IBeneficiariesConsolidateInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async deleteBeneficiariesConsolidate(
    id: number
  ): Promise<ApiResponse<IBeneficiariesConsolidateInterface | null>> {
    const res =
      await this.BeneficiariesConsolidateRepository.deleteBeneficiariesConsolidate(
        id
      );

    if (!res) {
      return new ApiResponse(
        {} as IBeneficiariesConsolidateInterface,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}
