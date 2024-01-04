import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ISpinsBeneficiariesConsolidateRepository } from "App/Repositories/SpinsBeneficiariesConsolidateRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ISpinsBeneficiary } from '../Interfaces/SpinsBeneficiaryInterfaces';

export interface ISpinsBeneficiariesConsolidateService {

  spinsSearch1(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>>; //TODO: Cambiar any por lo que corresponda de fuente 1 (No se descata paginación)
  spinsSearch2(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>>; //TODO: Cambiar any por lo que corresponda de fuente 2 (No se descata paginación)
  spinsSearch3(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>>; //TODO: Cambiar any por lo que corresponda de fuente 3 (No se descata paginación)

}

export default class SpinsBeneficiariesConsolidateService implements ISpinsBeneficiariesConsolidateService {

  constructor(
    private SpinsBeneficiariesConsolidateRepository: ISpinsBeneficiariesConsolidateRepository
  ) {}

  async spinsSearch1(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>> {

    const resSapi = await this.SpinsBeneficiariesConsolidateRepository.spinsSearch1(body);

    if (!resSapi)
      return new ApiResponse( {} as any[], EResponseCodes.FAIL, "No se encontraron recursos en la fuente 1 de giros");

    return new ApiResponse(resSapi, EResponseCodes.OK);

  }

  async spinsSearch2(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>> {

    const resSapi = await this.SpinsBeneficiariesConsolidateRepository.spinsSearch2(body);

    if (!resSapi)
      return new ApiResponse( {} as any[], EResponseCodes.FAIL, "No se encontraron recursos en la fuente 2 de giros");

    return new ApiResponse(resSapi, EResponseCodes.OK);

  }

  async spinsSearch3(body: ISpinsBeneficiary): Promise<ApiResponse<any[]>> {

    const resSapi = await this.SpinsBeneficiariesConsolidateRepository.spinsSearch3(body);

    if (!resSapi)
      return new ApiResponse( {} as any[], EResponseCodes.FAIL, "No se encontraron recursos en la fuente 3 de giros");

    return new ApiResponse(resSapi, EResponseCodes.OK);

  }

}
