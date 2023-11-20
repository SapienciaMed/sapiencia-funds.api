import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import {ICallDatingFilters} from "App/Interfaces/CallDatingInterfaces";
import DatingProvider from '@ioc:core.DatingProvider';
import { DBException } from 'App/Utils/DbHandlerError';
import DatingValidatorFilter from 'App/Validators/DatingValidator';



export default class DatingController {
  
  // GENERATE XLSX
  public async generateXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: ICallDatingFilters;
    
    try {
      filters = await request.validate(DatingValidatorFilter);
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }

    try {
      const resp = await DatingProvider.generateXLSXDating(filters)
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

public async geCallDatingPaginate({ response, request }: HttpContextContract) {
  try {
    const filters = request.body() as ICallDatingFilters;

    if (!Array.isArray(filters.programa)) {
      filters.programa = [Number(filters.programa)];
    }
    
    // Formatea los valores de id_comuna como una cadena separada por comas
    const idComunaList = filters.programa.join(',');

    filters.programa = idComunaList; // Asigna la cadena formateada a id_comuna

    const resp = await DatingProvider.geCallDatingPaginate(filters);

    return response.ok(resp);
  } catch (err) {
    return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
  }
}

}
