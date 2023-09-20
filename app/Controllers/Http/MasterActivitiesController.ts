import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterActivityProvider from "@ioc:core.MasterActivityProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";


export default class MasterActivitiesController {
    public async getMasterActivityById({
        request,
        response,
      }: HttpContextContract) {
        try {
          const { id } = request.params();
          return response.send(
            await MasterActivityProvider.getMasterActivityById(id)
          );
        } catch (err) {
          return response.badRequest(
            new ApiResponse(null, EResponseCodes.FAIL, String(err))
          );
        }
      }
}
