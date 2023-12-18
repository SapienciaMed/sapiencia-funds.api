import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RemnantProvider from '@ioc:core.RemnantProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { IRemnantFilters } from 'App/Interfaces/IRemnantInterface';
import { ApiResponse } from 'App/Utils/ApiResponses';
import RemnantValidator from 'App/Validators/RemnantValidator';

export default class RemnantController {

  public async getallRemnantsPaginated({ response, request }: HttpContextContract) {
    try {
      const data = request.body() as IRemnantFilters;
      return response.send(await RemnantProvider.getallRemnantsPaginated(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getRemnantById({ response, request, }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await RemnantProvider.getRemnantById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateRemnan({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      const data = await request.validate(RemnantValidator);      
      return response.send(await RemnantProvider.updateRemnan(id,data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
