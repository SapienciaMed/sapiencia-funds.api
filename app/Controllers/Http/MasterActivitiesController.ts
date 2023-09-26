import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import {IMasterActivityFilters} from "App/Interfaces/MasterActivityInterface";
import MasterActivityProvider from "@ioc:core.MasterActivityProvider";
import CreateAndUpdateMasterActivityValidator from "App/Validators/CreateAndUpdateMasterActivityValidator";

export default class MasterActivitiesController {
  public async createActivity({ 
    request, 
    response
  }: HttpContextContract) {
    try {
      //const filter = request.body() as IMasterActivity;
      const actividad = await request.validate(
        CreateAndUpdateMasterActivityValidator
      );
      return response.send(
        await MasterActivityProvider.createMasterActivity(actividad)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
   
      );
    }
  }

  public async getMasterActivity({ response }: HttpContextContract) {
    try {
      return response.send(
        await MasterActivityProvider.getActivitiesList()
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getMasterActivityPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IMasterActivityFilters;
      return response.send(
        await MasterActivityProvider.getMasterActivityPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getActivityById({
    request, 
    response 
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await MasterActivityProvider.getActivityById(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateActivity({
    request,
    response,
  }: HttpContextContract) {
    try {
      const activityValidate = await request.validate(
        CreateAndUpdateMasterActivityValidator
      );

      const { id } = activityValidate;

      return response.send(
        await MasterActivityProvider.updateMasterActivity(
          activityValidate,
          Number(id)
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }


}