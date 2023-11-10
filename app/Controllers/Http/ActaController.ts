import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActaProvider from '@ioc:core.ActaProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import ActaValidator from 'App/Validators/ActaValidator';

export default class ActaController {
  public async createActa({ response, request }: HttpContextContract) {
    try {
      const acta = await request.validate(
        ActaValidator
      );
      return response.send(
        await ActaProvider.createActa(acta)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))

      );
    }
  }

  public async getActa(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    const { id } = request.body()
    try {
      const actaFound = await ActaProvider.getActa(id)
      return response.ok(actaFound)
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
