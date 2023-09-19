import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VotingResultsProvider from "@ioc:core.VotingResultsProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class VotingResultsController {

  public async getVotingResultsById({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await VotingResultsProvider.getVotingResultsById(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
  
}
