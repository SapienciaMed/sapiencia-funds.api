import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallRenewal, ICallRenewalFilters } from "App/Interfaces/CallRenewalInterface";
import { IRenewalRepository } from "App/Repositories/Sapiencia/CallRenewalRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
//import { generateXLSX } from "App/Utils/generateXLSX";
// import {
//   furnitureXLSXFilePath,
//   furnitureXLSXRows,
//   furnitureXLSXcolumnNames,
// } from "./BudgetServiceXLSX";


export interface IRenewalService {

  geCallRenewalPaginate(
    filters: ICallRenewalFilters
  ): Promise<ApiResponse<IPagingData<ICallRenewal>>>;
}

export default class RenewalService implements IRenewalService 
{
  constructor(
    private renewalRepository: IRenewalRepository
  ) { }


  public async geCallRenewalPaginate(filters: ICallRenewalFilters) {
    const accountStatementsFound =
    await this.renewalRepository.geCallRenewalPaginate(
      filters
    );
  return new ApiResponse(accountStatementsFound, EResponseCodes.OK);

}
}

