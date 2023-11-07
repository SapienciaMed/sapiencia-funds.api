import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReumenPriorizacionProvider from "@ioc:core.ReumenPriorizacionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IResumPriorizacionFilters } from "App/Interfaces/SummaryPriorizacionInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import * as XLSX from "xlsx";

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

  async generateXlsx(rows: any): Promise<any> {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return buffer;
  }
}
