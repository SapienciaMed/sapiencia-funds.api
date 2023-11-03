import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import {ICallBudgetFilters} from "App/Interfaces/CallBudgetInterfaces";
import BudgetValidatorFilter from 'App/Validators/BudgetValidator';
import BudgetProvider from '@ioc:core.BudgetProvider';


export default class BudgetController {
  // GENERATE XLSX
  public async generateXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: ICallBudgetFilters;
    try {
      filters = await request.validate(BudgetValidatorFilter);
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await BudgetProvider.generateXLSXBudget(filters);
      response.header(
        "Content-Disposition",
        "attachment; filename=cuentas_cobro.xlsx"
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}