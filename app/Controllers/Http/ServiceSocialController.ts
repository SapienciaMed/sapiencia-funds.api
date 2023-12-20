import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ServiceSocialProvider from "@ioc:core.ServiceSocialProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IConsolidationTray } from "App/Interfaces/ConsolidationTrayInterface";
import {
  ISocialServiceBeneficiary,
  ISocialServiceFiltersInterface,
} from "App/Interfaces/SocialServiceInterface";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ServiceSocialController {
  public async import({ response }: HttpContextContract) {
    try {
      return response.send(await ServiceSocialProvider.import());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getServiceSocialPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as ISocialServiceFiltersInterface;
      return response.send(
        await ServiceSocialProvider.getServiceSocialPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateServiceSocial({ response, request }: HttpContextContract) {
    try {
      const data = request.body() as ISocialServiceBeneficiary;
      const { id } = request.body();
      const files = request.files("files");
      return response.send(
        await ServiceSocialProvider.updateSocialService(data, id,files)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getConsolidationSocialService({
    request,
    response,
  }: HttpContextContract) {
    try {
      const data = request.body() as IConsolidationTray;
      return response.send(
        await ServiceSocialProvider.geConsolidationSocialService(data)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async dowloadUploadFiles({ request, response }: HttpContextContract) {
    const { path } = request.body();

    try {
      return response.send(
        await ServiceSocialProvider.downloadFilesServiceSocial(`${path}`)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(
          null,
          EResponseCodes.FAIL,
          String("El requisito seleccionado no tiene adjuntos asociados")
        )
      );
    }
  }
}
