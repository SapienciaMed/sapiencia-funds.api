import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BeneficiariesConsolidateProvider from "@ioc:core.BeneficiariesConsolidateProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IBeneficiariesConsolidateFiltersInterface } from "App/Interfaces/BeneficiariesConsolidateInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import { CutValidator } from "App/Validators/CutValidator";

export default class BeneficiariesConsolidateContoller {
  public async getBeneficiariesConsolidateById({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await BeneficiariesConsolidateProvider.createBeneficiariesConsolidate(
          id
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createBeneficiariesConsolidate({
    request,
    response,
  }: HttpContextContract) {
    try {
      const BeneficiariesConsolidate = await request.validate(CutValidator);
      return response.send(
        await BeneficiariesConsolidateProvider.createBeneficiariesConsolidate(
          BeneficiariesConsolidate
        )
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getBeneficiariesConsolidatePaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IBeneficiariesConsolidateFiltersInterface;
      return response.send(
        await BeneficiariesConsolidateProvider.getBeneficiariesConsolidatePaginate(
          data
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateBeneficiariesConsolidate({
    request,
    response,
  }: HttpContextContract) {
    try {
      const BeneficiariesConsolidateVal = await request.validate(CutValidator);

      const { id } = request.params();

      return response.send(
        await BeneficiariesConsolidateProvider.updateBeneficiariesConsolidate(
          BeneficiariesConsolidateVal,
          Number(id)
        )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteBeneficiariesConsolidate({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();

      return response.send(
        await BeneficiariesConsolidateProvider.deleteBeneficiariesConsolidate(
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
