import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StatusListProvider from '@ioc:core.StatusListProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class StatusController {


    public async getStatusList({ response }: HttpContextContract){      
        try {
             return response.send(
               await StatusListProvider.getStatusList()
             );
           } catch (err) {
             return response.badRequest(
               new ApiResponse(null, EResponseCodes.FAIL, String(err))
             );
           } 
     }

}