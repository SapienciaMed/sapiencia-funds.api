import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import { ICallRenewalBecas, ICallRenewalFilters } from "App/Interfaces/CallRenewalInterface";
import RenewalProvider from '@ioc:core.RenewalProvider';
import { DBException } from 'App/Utils/DbHandlerError';
import RenewalValidatorFilter from 'App/Validators/RenewalValidator';
import RenewalValidator from 'App/Validators/CreteRenewalValidator';


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

  public async createCallRenewal({
    request,
    response
  }: HttpContextContract) {
    try {
      //const filter = request.body() as IMasterActivity;
      const renewal = await request.validate(
        RenewalValidator
      );
      return response.send(
        await RenewalProvider.createRenewal(renewal)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))

      );
    }
  }

  public async geCallRenewalPaginate({ response, request }: HttpContextContract) {
    try {
      const filters = request.body() as ICallRenewalFilters;
      return response.send(await RenewalProvider.geCallRenewalPaginate(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  } 

  public async calculate({ response, request }: HttpContextContract) {
    try {
      const { period } = request.params();      
      return response.send(await RenewalProvider.calculate(period));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  } 

  public async getBeca({ response, request }: HttpContextContract) {
    try {
      const { period } = request.params();

      console.log(period)     
      return response.send(await RenewalProvider.getBeca(period));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  } 

}
