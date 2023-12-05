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

  async approveCitation(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    const { id } = request.body()

    try {
      const approveCitation = await ActaProvider.approveCitation(id)
      return response.ok(approveCitation)
    } catch (err) {
      logger.error(err)
      const apiRes = new ApiResponse(null, EResponseCodes.FAIL, err.message)
      return response.badRequest(apiRes)
    }
  }

  async lastInsertId(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const lastId = await ActaProvider.lastInsertId()
      return response.ok(lastId)
    } catch (err) {
      logger.error(err)
      const apiRes = new ApiResponse(null, EResponseCodes.FAIL, err.message)
      return response.badRequest(apiRes)
    }
  }

  async updateActa(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      return response.send(
        await ActaProvider.updateActa(request.body())
      );
    } catch (err) {
      logger.error(err)
      const apiRes = new ApiResponse(null, EResponseCodes.FAIL, err.message)
      return response.badRequest(apiRes)
    }
  }

  async deleteCitation(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      return response.send(
        await ActaProvider.deleteCitation(request.body())
      );
    } catch (err) {
      logger.error(err)
      const apiRes = new ApiResponse(null, EResponseCodes.FAIL, err.message)
      return response.badRequest(apiRes)
    }
  }
}
