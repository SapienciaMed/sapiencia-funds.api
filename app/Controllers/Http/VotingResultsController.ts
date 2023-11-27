import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VotingResultsProvider from "@ioc:core.VotingResultsProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { generateExcel } from "App/Utils/generateXLSX";
import VotingResultsValidator from "App/Validators/VotingResultsValidator";

export default class VotingResultsController {
  public async getVotingPaginate({ response, request }: HttpContextContract) {
    try {
      const data = request.body() as IVotingFilters;
      return response.send(await VotingResultsProvider.getVotingPaginate(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getVotingPaginateXlsx({
    response,
    request,
  }: HttpContextContract) {      
    try {
      const data = request.body() as IVotingFilters;
     
      response.header("Content-Type", "application/vnd.ms-excel");
      response.header(
        "Content-Disposition",
        "attachment; filename=ReportePlanilla.xls"
      );

      const resp = await VotingResultsProvider.getVotingPaginateXlsx(data);

      const responsexlsx = await generateExcel(resp.data);
      response.send(new ApiResponse(responsexlsx, EResponseCodes.OK));

    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

    public async getPaginatedtotal({
    response,
    request,
  }: HttpContextContract) {      
    try {
      const data = request.body() as IVotingFilters;
  
      const resp = await VotingResultsProvider.getPaginatedtotal(data);
      response.send(new ApiResponse(resp.data, EResponseCodes.OK));

    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getVotingResultsById({
    request,
    response,
  }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await VotingResultsProvider.getVotingResultsById(id)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getActivityProgram({ response, request }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(
        await VotingResultsProvider.getActivityProgram(Number(id))
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createVotingResult({ response, request }: HttpContextContract) {
    try {
      const voting = await request.validate(VotingResultsValidator);
      return response.send(
        await VotingResultsProvider.createVotingResult(voting)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async updateVotingResult({ response, request }: HttpContextContract) {
    try {
      const { id } = request.params();
      const voting = await request.validate(VotingResultsValidator);

      return response.send(
        await VotingResultsProvider.updateVotingResult(voting, id)
      );
    } catch (err) {
      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
