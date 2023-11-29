import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConsolidationProvider from "@ioc:core.ConsolidationProvider";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

export default class ConsolidationController {
  public async createConsolidationByState({ response }: HttpContextContract) {
    try {
      return response.send(
        await ConsolidationProvider.createConsolidationByState()
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createConsolidationBiannual({ response }: HttpContextContract) {
    try {
      return response.send(
        await ConsolidationProvider.createConsolidationBiannual()
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
