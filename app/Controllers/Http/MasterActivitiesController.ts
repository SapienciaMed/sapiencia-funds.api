import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import {IMasterActivity} from "App/Interfaces/MasterActivityInterface";
import MasterActivityProvider from "@ioc:core.MasterActivityProvider";
import CreateAndUpdateMasterActivityValidator from "App/Validators/CreateAndUpdateMasterActivityValidator";

export default class MasterActivitiesController {
  public async createActivity({ 
    request, 
    response
  }: HttpContextContract) {
    try {
      //const filter = request.body() as IMasterActivity;
      const actividad = await request.validate(
        CreateAndUpdateMasterActivityValidator
      );
      return response.send(
        await MasterActivityProvider.createMasterActivity(actividad)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
   
      );
    }
  }
}