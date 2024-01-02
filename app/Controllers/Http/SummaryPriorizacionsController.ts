import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReumenPriorizacionProvider from "@ioc:core.ReumenPriorizacionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IPrioritizationSummaryFilters,
  IResumPriorizacionFilters,
} from "App/Interfaces/SummaryPriorizacionInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { generateExcel } from "App/Utils/generateXLSX";
import { prioritizationSummaryFiltersSchema } from "App/Validators/PrioritizationSummary";

export default class SummaryPriorizacionsController {
  public async getSummaryPriorizacionPaginate(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IPrioritizationSummaryFilters;
    try {
      filters = await request.validate({
        schema: prioritizationSummaryFiltersSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const prioritizationSummaryFound =
        await ReumenPriorizacionProvider.getVotingPaginate(filters);
      return response.ok(prioritizationSummaryFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }

  public async getSummaryPriorizacionReportXLS({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IResumPriorizacionFilters;
      const objectresp = await ReumenPriorizacionProvider.getVotingXLSX(data);
      response.header("Content-Type", "application/vnd.ms-excel");
      response.header(
        "Content-Disposition",
        "attachment; filename=ReportePlanilla.xls"
      );
      const responsexlsx = await generateExcel(objectresp.data);
      response.send(new ApiResponse(responsexlsx, EResponseCodes.OK));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}
