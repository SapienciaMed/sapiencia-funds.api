import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import {ICallBudgetFilters} from "App/Interfaces/CallBudgetInterfaces";
import BudgetProvider from '@ioc:core.BudgetProvider';
import { DBException } from 'App/Utils/DbHandlerError';
import BudgetValidatorFilter from 'App/Validators/BudgetValidator';


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
      const resp = await BudgetProvider.generateXLSXBudget(filters)
      response.header(
        "Content-Disposition",
        "attachment; filename=Presupuesto_convocatoria.xlsx"
      )
      return response.download(resp.data)
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }

public async geCallBudgetPaginate({ response, request }: HttpContextContract) {
  try {
    const filters = request.body() as ICallBudgetFilters;

    if (!Array.isArray(filters.id_comuna)) {
      filters.id_comuna = [Number(filters.id_comuna)];
    }
    
    // Formatea los valores de id_comuna como una cadena separada por comas
    const idComunaList = filters.id_comuna.join(',');

    filters.id_comuna = idComunaList; // Asigna la cadena formateada a id_comuna

    const resp = await BudgetProvider.geCallBudgetPaginate(filters);

    return response.ok(resp);
  } catch (err) {
    return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
  }
}

}
