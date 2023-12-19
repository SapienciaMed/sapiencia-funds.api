import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AbsorptionPercentageProvider from "@ioc:core.AbsorptionPercentageProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAbsortionPercentageCreateSchema,
  IAbsortionPercentagePaginatedFilters,
  IAbsortionPercentageUpdateSchema,
} from "App/Interfaces/AbsorptionPercentage";
import { ApiResponse } from "App/Utils/ApiResponses";
import { DBException } from "App/Utils/DbHandlerError";
import {
  createAbsorptionPercentageSchema,
  filterAbsorptionPercentageSchema,
  updateAbsorptionPercentageSchema,
} from "App/Validators/AbsorptionPercentageValidator";

export default class AbsorptionPercentageController {
  // GET COMMUNE RESOURCES
  public async getCommuneResources(ctx: HttpContextContract) {
    const { response, logger } = ctx;
    try {
      const communeResourcesFound =
        await AbsorptionPercentageProvider.getCommuneResources();
      return response.ok(communeResourcesFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // CREATE AN ABSORPTION PERCENTAGE
  public async createAbsorptionPercentage(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let payload: IAbsortionPercentageCreateSchema;
    try {
      payload = await request.validate({
        schema: createAbsorptionPercentageSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const newAbsorptionPercentage =
        await AbsorptionPercentageProvider.createAbsortionPercentage(payload);
      return response.created(newAbsorptionPercentage);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GET ALL ABSORPTION PERCENTAGE PAGINATED
  public async getAllAbsorptionPercentagePaginated(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAbsortionPercentagePaginatedFilters;
    try {
      filters = await request.validate({
        schema: filterAbsorptionPercentageSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const absorptionPercentageFound =
        await AbsorptionPercentageProvider.getAllAbsorptionPercentagePaginated(
          filters
        );
      return response.ok(absorptionPercentageFound);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // UPDATE ABSORPTION PERCENTAGE BY ID
  public async updateAbsorptionPercentageById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAbsortionPercentageUpdateSchema;
    try {
      filters = await request.validate({
        schema: updateAbsorptionPercentageSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const { id } = request.params();
      const absorptionPercentageUpdated =
        await AbsorptionPercentageProvider.updateAbsorptionPercentageById(
          id,
          filters
        );
      return response.ok(absorptionPercentageUpdated);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // DELETE ABSORPTION PERCENTAGE BY ID
  public async deleteAbsorptionPercentageById(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    try {
      const { id } = request.params();
      const absorptionPercentageDeleted =
        await AbsorptionPercentageProvider.deleteAbsorptionPercentageById(id);
      return response.ok(absorptionPercentageDeleted);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
  // GENERATE ABSORPTION PERCENTAGE XLSX
  public async generateAbsorptionPercentageXLSX(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;
    let filters: IAbsortionPercentagePaginatedFilters;
    try {
      filters = await request.validate({
        schema: filterAbsorptionPercentageSchema,
      });
    } catch (err) {
      return DBException.badRequest(ctx, err);
    }
    try {
      const resp =
        await AbsorptionPercentageProvider.generateAbsorptionPercentageXLSX(
          filters
        );
      response.header(
        "Content-Disposition",
        "attachment; filename=porcentaje_absorcion.xlsx"
      );
      return response.download(resp.data);
    } catch (err) {
      logger.error(err);
      const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
      return response.badRequest(apiResp);
    }
  }
}
