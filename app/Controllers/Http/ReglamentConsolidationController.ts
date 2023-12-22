import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReglamentConsolidationProvider from '@ioc:core.ReglamentConsolidationProvider';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IReglamentConsolidation,
         IFiltersForReglament } from '../../Interfaces/SapienciaGenericInterface';


export default class ReglamentConsolidationController {

  public async getPeriodsSapi({ response }: HttpContextContract) {

    try {

      return response.send(await ReglamentConsolidationProvider.getPeriodsSapi());

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async getReglamentPaginate({ request, response }: HttpContextContract) {

    try {

      const filters = request.body() as IFiltersForReglament;
      return response.send(await ReglamentConsolidationProvider.getReglamentPaginate(filters));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async getReglamentById({ request, response }: HttpContextContract) {

    try {

      const { id } = request.params();
      return response.send(await ReglamentConsolidationProvider.getReglamentById(id));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async createReglament({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IReglamentConsolidation;
      return response.send(await ReglamentConsolidationProvider.createReglament(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

}
