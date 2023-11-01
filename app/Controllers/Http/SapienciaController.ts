import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SapienciaProvider from "@ioc:core.SapienciaProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class SapienciaController {
  public async getAllCallPeriod({ response }: HttpContextContract) {
    try {
      return response.send(await SapienciaProvider.getAllCallPeriod());
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
  public async getAllCallBudget({ response }: HttpContextContract) {
    try {
      return response.send(await SapienciaProvider.getAllCallBudget());
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
  public async geCallBudgetPaginate({response,request,
  }: HttpContextContract) {
    try {
      const data = request.body() as ICallBudgetFilters;
      return response.send(
        await SapienciaProvider.geCallBudgetPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
