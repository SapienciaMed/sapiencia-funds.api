import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CutsProvider from "@ioc:core.CutsProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICutFiltersInterface } from "App/Interfaces/CutInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { CutValidator } from "App/Validators/CutValidator";

export default class CutsController {
  public async getCutsById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await CutsProvider.getCutById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createCuts({ request, response }: HttpContextContract) {
    try {
      const Cuts = await request.validate(CutValidator);
      return response.send(await CutsProvider.createCut(Cuts));
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getCutsPaginate({ response, request }: HttpContextContract) {
    try {
      const data = request.body() as ICutFiltersInterface;
      return response.send(await CutsProvider.getCutPaginate(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateCuts({ request, response }: HttpContextContract) {
    try {
      const CutsVal = await request.validate(CutValidator);

      const { id } = request.params();

      return response.send(await CutsProvider.updateCut(CutsVal, Number(id)));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteCuts({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();

      return response.send(await CutsProvider.deleteCut(Number(id)));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
