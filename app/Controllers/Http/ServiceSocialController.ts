 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceSocialProvider from '@ioc:core.ServiceSocialProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class ServiceSocialController {
    public async import({ response }: HttpContextContract) {

      
        try {
          return response.send(
            await ServiceSocialProvider.import()
          );
        } catch (err) {
          return response.badRequest(
            new ApiResponse(null, EResponseCodes.FAIL, String(err))
          );
        } 
      }
}
