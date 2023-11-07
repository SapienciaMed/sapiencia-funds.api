import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import {ICallBudgetFilters} from "App/Interfaces/CallBudgetInterfaces";
import BudgetProvider from '@ioc:core.BudgetProvider';


export default class BudgetController {
  // GENERATE XLSX
  public async generateXLSX({ response, request }: HttpContextContract) {
    try {
      const filters = request.body() as ICallBudgetFilters;
      
      if (!Array.isArray(filters.id_comuna)) {
        filters.id_comuna = [Number(filters.id_comuna)];
      }
      filters.id_comuna = filters.id_comuna.map(Number);

      console.log("*************+++++",filters )
      
      const resp = await BudgetProvider.generateXLSXBudget(
        filters
      );
      response.header(
        "Content-Disposition",
        "attachment; filename=activos_fijos.xlsx"
      );

      return response.download(resp.data);

      // return response.download(resp.data);
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }
}