import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ResourcePrioritizationProvider from "@ioc:core.ResourcePrioritizationProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class ResourcePrioritizationController {
  public async setResourcePrioritization({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: schema.create({
          id: schema.number.optional(),
          programId: schema.number(),
          projectNumber: schema.number(),
          validity: schema.number(),
          communeId: schema.number(),
          total123: schema.number(),
          total456: schema.number(),
          value: schema.number(),
          places: schema.number(),
          averageCost: schema.number(),
          generalRate: schema.number(),
          operatingCostAndExpense: schema.number(),
          grossValue: schema.number(),
          financialPerformances: schema.number(),
          balanceResources: schema.number(),
          operatorCommissionAct: schema.number(),
          operatorCommissionBalance: schema.number(),
          operatorCommission: schema.number(),
          resourceForCredit: schema.number(),
        }),
      });

      return response.send(
        await ResourcePrioritizationProvider.setResourcePrioritization(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getResourcePrioritizationPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: schema.create({
          page: schema.number(),
          perPage: schema.number(),
          projectNumber: schema.number(),
          programId: schema.number(),
          validity: schema.number(),
        }),
      });

      return response.send(
        await ResourcePrioritizationProvider.getResourcePrioritizationPaginate(
          data
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getResourcePrioritizationTotals({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: schema.create({
          programId: schema.number(),
          projectNumber: schema.number(),
          validity: schema.number(),
        }),
      });
      return response.send(
        await ResourcePrioritizationProvider.getResourcePrioritizationTotals(
          data
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
