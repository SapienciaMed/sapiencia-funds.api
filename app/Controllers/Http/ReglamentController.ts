import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReglamentProvider from "@ioc:core.ReglamentProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IReglamentFiltersInterface } from "App/Interfaces/IReglamentInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ReglamentValidator } from "App/Validators/ReglamentValidator";

export default class ReglamentController {
  public async getReglamentById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ReglamentProvider.getReglamentById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getPrograms({ response }: HttpContextContract) {
    try {
      return response.send(await ReglamentProvider.getPrograms());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getLastId({ response }: HttpContextContract) {
    try {
      return response.send(await ReglamentProvider.getLastId());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createReglament({ request, response }: HttpContextContract) {
    try {
      const reglament = await request.validate(ReglamentValidator);
      return response.send(await ReglamentProvider.createReglament(reglament));
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getReglamentPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IReglamentFiltersInterface;
      return response.send(await ReglamentProvider.getReglamentPaginate(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateReglament({ request, response }: HttpContextContract) {
    try {
      const reglamentVal = await request.validate(ReglamentValidator);

      const { id } = request.params();

      return response.send(
        await ReglamentProvider.updateReglament(reglamentVal, Number(id))
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteReglament({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      return response.send(await ReglamentProvider.deleteReglament(Number(id)));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
