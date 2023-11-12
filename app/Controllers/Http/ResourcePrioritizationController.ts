import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ResourcePrioritizationProvider from "@ioc:core.ResourcePrioritizationProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class VotingResultsController {
  public async getResourcePrioritizationPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: schema.create({
          page: schema.number(),
          perPage: schema.number(),
          projectNumber: schema.number.optional(),
          programId: schema.number.optional(),
          validity: schema.number.optional(),
        }),
      });

      return response.send(
        await ResourcePrioritizationProvider.getResourcePrioritizationPaginate(
          data
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
