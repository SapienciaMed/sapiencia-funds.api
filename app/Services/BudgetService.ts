import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { IBudgetRepository } from "App/Repositories/BudgetRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { generateXLSX } from "App/Utils/generateXLSX";
import {
  furnitureXLSXFilePath,
  furnitureXLSXRows,
  furnitureXLSXcolumnNames,
} from "./BudgetServiceXLSX";


export interface IBudgetService {
  generateXLSXBudget(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<string>>
  geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>>;
}

export default class BudgetService 
implements IBudgetService 
{
  constructor(
    private budgetRepository: IBudgetRepository
  ) { }

  public async generateXLSXBudget(filters: ICallBudgetFilters) {
    const accountStatementsFound = await this.budgetRepository.geCallBudgetPaginate(filters);
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      filePath: furnitureXLSXFilePath,
      worksheetName: "Presupuesto",
      data: furnitureXLSXRows(accountStatementsFound),
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }

  public async geCallBudgetPaginate(filters: ICallBudgetFilters) {
    const accountStatementsFound =
    await this.budgetRepository.geCallBudgetPaginate(
      filters
    );
  return new ApiResponse(accountStatementsFound, EResponseCodes.OK);

}
}

