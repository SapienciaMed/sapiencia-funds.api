import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallDating, ICallDatingFilters } from "App/Interfaces/CallDatingInterfaces";
import { IDatingRepository } from "App/Repositories/Sapiencia/CallDatingRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  furnitureXLSXFilePath,
  furnitureXLSXRows,
  furnitureXLSXcolumnNames,
} from "./DatingServiceXLSX";


export interface IDatingService {
  generateXLSXDating(
    filters: ICallDatingFilters
  ): Promise<ApiResponse<string>>
  geCallDatingPaginate(
    filters: ICallDatingFilters
  ): Promise<ApiResponse<IPagingData<ICallDating>>>;
}

export default class DatingService 
implements IDatingService 
{
  constructor(
    private datingRepository: IDatingRepository
  ) { }

  public async generateXLSXDating(filters: ICallDatingFilters) {
    const accountStatementsFound = await this.datingRepository.geCallDatingPaginate(filters);
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      filePath: furnitureXLSXFilePath,
      worksheetName: "Citas",
      data: furnitureXLSXRows(accountStatementsFound),
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }

  public async geCallDatingPaginate(filters: ICallDatingFilters) {
    const accountStatementsFound =
    await this.datingRepository.geCallDatingPaginate(
      filters
    );
  return new ApiResponse(accountStatementsFound, EResponseCodes.OK);

}
}

