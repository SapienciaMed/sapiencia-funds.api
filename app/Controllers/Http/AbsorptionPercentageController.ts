import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AbsorptionPercentageProvider from "@ioc:core.AbsorptionPercentageProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IAbsortionPercentageCreateSchema } from "App/Interfaces/AbsorptionPercentage";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { createAbsorptionPercentageSchema } from "App/Validators/AbsorptionPercentageValidator";

export default class AbsorptionPercentageController {
  // GET COMMUNE RESOURCES
  public async getCommuneResources(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const communeResourcesFound =
        await AbsorptionPercentageProvider.getCommuneResources();
      return response.ok(communeResourcesFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // CREATE AN ABSORPTION PERCENTAGE
  public async createAbsorptionPercentage(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAbsortionPercentageCreateSchema;
    try {
      payload = await request.validate({
        schema: createAbsorptionPercentageSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAbsorptionPercentage =
        await AbsorptionPercentageProvider.createAbsortionPercentage(payload);
      return response.created(newAbsorptionPercentage);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
