import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SocializationProvider from "@ioc:core.SocializationProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ISocializationFilters } from "App/Interfaces/ISocialization";
import { ApiResponse } from "App/Utils/ApiResponses";
import { SocializationValidator } from "App/Validators/SocializationVlidator";

export default class SocializationController {
  public async getSocializationById({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await SocializationProvider.getSocializationById(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createSocialization({ request, response }: HttpContextContract) {
    try {
      const socialization = await request.validate(SocializationValidator);
      return response.send(
        await SocializationProvider.createSocialization(socialization)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getSocializationPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as ISocializationFilters;
      return response.send(
        await SocializationProvider.getSocializationPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateSocialization({ request, response }: HttpContextContract) {
    try {
      const socializationVal = await request.validate(SocializationValidator);

      const { id } = request.params();

      return response.send(
        await SocializationProvider.updateSocialization(
          socializationVal,
          Number(id)
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
