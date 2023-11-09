import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReumenPriorizacionProvider from "@ioc:core.ReumenPriorizacionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IResumPriorizacionFilters } from "App/Interfaces/SummaryPriorizacionInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";


export default class SummaryPriorizacionsController {
  public async getSummaryPriorizacionPaginate({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IResumPriorizacionFilters;
      return response.send(
        await ReumenPriorizacionProvider.getVotingPaginate(data)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getSummaryPriorizacionReportXLS({
    response,
    request,
  }: HttpContextContract) {
    try {
      const data = request.body() as IResumPriorizacionFilters;
      const objectresp = await ReumenPriorizacionProvider.getVotingXLSX(data)
      response.header("Content-Type", "application/vnd.ms-excel");
      response.header(
        "Content-Disposition",
        "attachment; filename=ReportePlanilla.xls"
      );
      const responsexlsx = await  ReumenPriorizacionProvider.generateXlsx(objectresp.data)
      response.send(new ApiResponse(responsexlsx, EResponseCodes.OK));

    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }


}
