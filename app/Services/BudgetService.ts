import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {ICallBudgetFilters} from "App/Interfaces/CallBudgetInterfaces";
import { IBudgetRepository } from "App/Repositories/BudgetRepository";
import { ApiResponse} from "App/Utils/ApiResponses";


export interface IBudgetService {
  generateXLSXBudget(filters: ICallBudgetFilters)
}

export default class BudgetService implements IBudgetService {
    constructor(private budgetRepository: IBudgetRepository) {}

    public async generateXLSXBudget(filters: ICallBudgetFilters) {
    const Budget = await this.budgetRepository.geCallBudgetFilter(filters);
    //   await generateXLSX({
    //     columns: accountStatementXLSXColumns,
    //     data: accountStatementXLSXRows(res),
    //     filePath: accountStatementXLSXFilePath,
    //     worksheetName: "Cuentas de cobro",
    //   });
      return new ApiResponse(
        Budget, //quitar
        //accountStatementXLSXFilePath, 
        EResponseCodes.OK);
    }

  
}

