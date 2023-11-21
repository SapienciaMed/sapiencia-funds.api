import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallRenewal, ICallRenewalFilters } from "App/Interfaces/CallRenewalInterface";
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
}

