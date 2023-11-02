import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RequerimentProvider from "@ioc:core.RequerimentProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IRequerimentFiltersInterface } from "App/Interfaces/IRequerimentInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { RequerimentValidator } from "App/Validators/RequerimentValidator";

export default class RequerimentController {
  public async createRequeriment({ request, response }: HttpContextContract) {
    try {
      const requeriment = await request.validate(RequerimentValidator);
      return response.send(
        await RequerimentProvider.createRequeriment(requeriment)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getRequerimentPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IRequerimentFiltersInterface;
      return response.send(
        await RequerimentProvider.getRequerimentPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateRequeriment({ request, response }: HttpContextContract) {
    try {
      const requerimentVal = await request.validate(RequerimentValidator);

      const { id } = request.params();

      return response.send(
        await RequerimentProvider.updateRequeriment(requerimentVal, Number(id))
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteRequeriment({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      return response.send(
        await RequerimentProvider.deleteRequeriment(Number(id))
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteByReglamentId({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      return response.send(
        await RequerimentProvider.deleteByReglamentId(Number(id))
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
