import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeMasterListProvider from '@ioc:core.TypeMasterListProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class TypeMasterListController {
    

    public async getTypeMasterList({ response }: HttpContextContract){      
       try {
            return response.send(
              await TypeMasterListProvider.getTypeMasterList()
            );
          } catch (err) {
            return response.badRequest(
              new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
          } 
    }
}
