import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterProvider from '@ioc:core.MasterProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { IMasterFilters } from 'App/Interfaces/MasterInterface';
import { ApiResponse } from 'App/Utils/ApiResponses';
import CreateMasterValidator from 'App/Validators/CreateMasterValidator';


export default class MasterController {

    public async createMaster({ 
        request, 
        response
    }: HttpContextContract){
        try {
            const master = await request.validate(
                CreateMasterValidator
              );
              return response.send(
                await MasterProvider.createMaster(master)
              );  
        } catch (err) {
            response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
           
              );
        }
           
    }

    public async getMasterPaginate({
        response,
        request,
      }: HttpContextContract) {      
        try {
          const data = request.body() as IMasterFilters;
          return response.send(
            await MasterProvider.getMasterPaginate(data)
          );
        } catch (err) {
          return response.badRequest(
            new ApiResponse(null, EResponseCodes.FAIL, String(err))
          );
        }
      }
}
