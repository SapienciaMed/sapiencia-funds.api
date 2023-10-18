import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import {IUploadInformationFilters} from "App/Interfaces/UploadInformationInterface";
import UploadInformationProvider from "@ioc:core.UploadInformationProvider";
import StorageProvider from "@ioc:core.StorageProvider";
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

  public async uploadInformation({ request, response }: HttpContextContract) {
    const files = request.files('files');
    const { id } = request.params();
    if(files) {
      const results = await Promise.all(
        files.map(async (file) => {
          if(file.tmpPath) {
            const fileUrl = await StorageProvider.uploadInformation(file, `cargar-informacion/${id}/`);
            return fileUrl;
          } else {
            return false;
          }
        })
      );
      const filesFailed: MultipartFileContract[] = [];
      results.forEach((result, index) => {
        if(!result) filesFailed.push(files[index]);
      });
      if(filesFailed.length > 0) {
        const filesFailedStr = filesFailed.map(item => item.clientName);
        return response.badRequest(
          new ApiResponse(true, EResponseCodes.WARN, `No se pudieron guardar el siguiente archivo: ${filesFailedStr.join(",")}`)
        );
      } else {
        return response.send(
          new ApiResponse(true, EResponseCodes.OK, "¡Archivo guardado exitosamente!")
        );
      }
    } else {
      return response.badRequest(
        new ApiResponse(false, EResponseCodes.FAIL, "Sin archivo para cargar.")
      );
    }
  }

  public async getInformationFiles({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      return response.send(await StorageProvider.getInformationFiles(`cargar-informacion/${id}`));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

}