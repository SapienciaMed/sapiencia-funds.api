import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import StorageProvider from "@ioc:core.StorageProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class StoragesController {
  public async getFiles({ response }: HttpContextContract) {
    try {
      return response.send(
        await StorageProvider.getFiles("cargar-transferencia-conocimiento")
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
