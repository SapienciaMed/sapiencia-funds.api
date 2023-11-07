import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { IBudgetRepository } from "App/Repositories/BudgetRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
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
}

export default class BudgetService 
implements IBudgetService 
{
  constructor(
    private budgetRepository: IBudgetRepository
  ) { }

  public async generateXLSXBudget(filters: ICallBudgetFilters) {
    const accountStatementsFound =
      await this.budgetRepository.geCallBudgetFilter(
        filters
      );
      console.log("********aa", accountStatementsFound)
    await generateXLSX({
      columns: furnitureXLSXcolumnNames,
      filePath: furnitureXLSXFilePath,
      worksheetName: "Cuentas de cobro",
      data: furnitureXLSXRows(accountStatementsFound),
    });
    return new ApiResponse(furnitureXLSXFilePath, EResponseCodes.OK);
  }

}

