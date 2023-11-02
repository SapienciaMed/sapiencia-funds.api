import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReumenPriorizacionProvider from "@ioc:core.ReumenPriorizacionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IResumPriorizacionFilters } from "App/Interfaces/ResumenPriorizacionInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ResumenPriorizacionsController {
      public async getResumenPriorizacionPaginate({
    response,
    request,
  }: HttpContextContract) {      
    try {
      const data = request.body() as IResumPriorizacionFilters;
      return response.send(
        await ReumenPriorizacionProvider.getVotingPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
