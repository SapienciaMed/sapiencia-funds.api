import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import LegalizedProvider from "@ioc:core.LegalizedProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ILegalizedPaginatedFilters } from "App/Interfaces/Legalized";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import { filterLegalizedSchema } from "App/Validators/LegalizedValidator";

export default class AbsorptionPercentageController {
  // GET ALL LEGALIZED
  public async getAllLegalized(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: ILegalizedPaginatedFilters;
    try {
      filters = await request.validate({
        schema: filterLegalizedSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const LegalizedFound = await LegalizedProvider.getAllLegalized(filters);
      return response.ok(LegalizedFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE LEGALIZED XLSX
  public async generateLegalizedXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: ILegalizedPaginatedFilters;
    try {
      filters = await request.validate({
        schema: filterLegalizedSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp = await LegalizedProvider.generateLegalizedXLSX(filters);
      response.header(
        "Content-Disposition",
        "attachment; filename=legalizados.xlsx"
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}