import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import {IUploadInformationFilters} from "App/Interfaces/UploadInformationInterface";
import UploadInformationProvider from "@ioc:core.UploadInformationProvider";
import UploadInformationValidatorValidator from "App/Validators/UploadInformationValidator";

export default class UploadInformationController {
  public async createUploadInformation({ 
    request, 
    response
  }: HttpContextContract) {
    try {
      //const filter = request.body() as IMasterActivity;
      const uploadInformation = await request.validate(
        UploadInformationValidatorValidator
      );
      return response.send(
        await UploadInformationProvider.createUploadInformation(uploadInformation)
      );
      
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
   
      );
    }
  }
  

public async getUploadInformation({ response }: HttpContextContract) {
    try {
      return response.send(
        await UploadInformationProvider.getUploadInformation()
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getUploadInformationById({
    request, 
    response 
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await UploadInformationProvider.getUploadInformationById(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getUploadInformationPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IUploadInformationFilters;
      return response.send(
        await UploadInformationProvider.getUploadInformationPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

}