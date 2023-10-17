import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SapienciaProvider from "@ioc:core.SapienciaProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
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
}
