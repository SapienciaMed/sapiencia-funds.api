import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import  SummaryPriorizacionRepository  from "App/Repositories/SummaryPriorizacionRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IItemResults } from "App/Interfaces/ItemInterface";
import * as XLSX from "xlsx";

export interface IREsumenPriorizacionService {
  getVotingPaginate(filters: IVotingFilters): Promise<ApiResponse<IPagingData<IItemResults>>>;
  getVotingXLSX(filters: IVotingFilters): Promise<any>;
  generateXlsx(rows : any)
}

export default class SummaryPriorizacionService implements IREsumenPriorizacionService {
  constructor(private resumenPriorizacionRepository: SummaryPriorizacionRepository) {}

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<ApiResponse<IPagingData<IItemResults>>> {
    const Activity =
      await this.resumenPriorizacionRepository.getVotingPaginate(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }
    async getVotingXLSX(
    filters: IVotingFilters
  ): Promise<any> {
    const Activity =
      await this.resumenPriorizacionRepository.getVotinXSLX(filters);
    return new ApiResponse(Activity, EResponseCodes.OK);
  }


    async generateXlsx(rows: any): Promise<any> {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return buffer;
  }

}
