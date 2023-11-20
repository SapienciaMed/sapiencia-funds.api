import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import {ICallRenewalFilters} from "App/Interfaces/CallRenewalInterface";
import RenewalProvider from '@ioc:core.RenewalProvider';
import { DBException } from 'App/Utils/DbHandlerError';
import RenewalValidatorFilter from 'App/Validators/RenewalValidator';


export default class RenewalController {
  
  //GENERATE XLSX
  public async generateXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: ICallRenewalFilters;
    
    try {
      filters = await request.validate(RenewalValidatorFilter);
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }

    try {  
      console.log("************vengo con filters", filters)
      const resp = await RenewalProvider.generateXLSXRenewal(filters)
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


public async geCallRenewalPaginate({ response, request }: HttpContextContract) {
  try {
    const filters = request.body() as ICallRenewalFilters;

    const resp = await RenewalProvider.geCallRenewalPaginate(filters);

    return response.ok(resp);
  } catch (err) {
    return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
  }
}

}
