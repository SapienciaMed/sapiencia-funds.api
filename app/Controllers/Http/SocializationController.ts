import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SocializationProvider from "@ioc:core.SocializationModule";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class SocializationController {
  public async getActivityById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      const res = await SocializationProvider.getSocializationById(id);
      response.send(res);
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
