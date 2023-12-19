import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FiduciaProvider from '@ioc:core.FiduciaProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class FiduciaController {

    public async getFiduciaList({ response }: HttpContextContract){    
        
       
        try {
             return response.send(
               await FiduciaProvider.getFiduciaList()
             );
           } catch (err) {
             return response.badRequest(
               new ApiResponse(null, EResponseCodes.FAIL, String(err))
             );
           } 
     }
}
