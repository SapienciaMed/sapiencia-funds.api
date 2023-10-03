import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
//import {IMasterActivityFilters} from "App/Interfaces/MasterActivityInterface";
//import MasterActivityProvider from "@ioc:core.MasterActivityProvider";
//import CreateAndUpdateMasterActivityValidator from "App/Validators/CreateAndUpdateMasterActivityValidator";

export default class UploadInformationController {

public async getUploadInformation({ response }: HttpContextContract) {
    try {
      
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}