import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallRenewal, ICallRenewalFilters, IUpdateRenewal } from "App/Interfaces/CallRenewalInterface";
import { IRenewalRepository } from "App/Repositories/Sapiencia/CallRenewalRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  furnitureXLSXFilePath,
  furnitureXLSXRows,
  furnitureXLSXcolumnNames,
} from "./RenewalServiceXLSX";


export interface IRenewalService {
  createRenewal(
    renewal: ICallRenewal
  ): Promise<ApiResponse<ICallRenewal>>;
  generateXLSXRenewal(
    filters: ICallRenewalFilters
  ): Promise<ApiResponse<string>>
  geCallRenewalPaginate(
    filters: ICallRenewalFilters
  ): Promise<ApiResponse<IPagingData<ICallRenewal>>>;
  calculate(period: any): Promise<ApiResponse<any>>;
  getBeca(period:number, ): Promise<ApiResponse<any>>;
  createReportRenewal(renewal: IUpdateRenewal, period: number): Promise<ApiResponse<IUpdateRenewal>>;
}

export default class RenewalService implements IRenewalService {
  constructor(
    private renewalRepository: IRenewalRepository
  ) { }
  

  //crear Renewal
  async createRenewal(renewal: ICallRenewal): Promise<ApiResponse<ICallRenewal>> {
    const res = await this.renewalRepository.createRenewal(renewal);
    if (!res) {
      return new ApiResponse(
        {} as ICallRenewal,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async generateXLSXRenewal(filters: ICallRenewalFilters) {
    const accountStatementsFound = await this.renewalRepository.geCallRenewalPaginate(filters);
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      filePath: furnitureXLSXFilePath,
      worksheetName: "Presupuesto",
      data: furnitureXLSXRows(accountStatementsFound),
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }


  public async geCallRenewalPaginate(filters: ICallRenewalFilters) {
    const accountStatementsFound =
      await this.renewalRepository.geCallRenewalPaginate(
        filters
      );
    return new ApiResponse(accountStatementsFound, EResponseCodes.OK);

  }

  public async calculate(period: any): Promise<ApiResponse<any>> {
    const accountStatementsFound = await this.renewalRepository.calculate(period);
    return new ApiResponse(accountStatementsFound, EResponseCodes.OK);
  }

  async getBeca(period) {
    const res = await this.renewalRepository.getBeca(period,)
    return new ApiResponse(res, EResponseCodes.OK)
}

async createReportRenewal(renewal: IUpdateRenewal, period: number): Promise<ApiResponse<IUpdateRenewal>> {
  const res = await this.renewalRepository.createReportRenewal(renewal, period);

  if (!res) {
    return new ApiResponse(
      {} as IUpdateRenewal,
      EResponseCodes.FAIL,
      "El registro indicado no existe"
    );
  }

  return new ApiResponse(res, EResponseCodes.OK);
}

}

