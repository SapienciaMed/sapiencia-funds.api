import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
    IUploadInformation,
    IUploadInformationFilters,
} from "App/Interfaces/UploadInformationInterface";
import { IUploadInformationRepository } from "App/Repositories/UploadInformationRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";


export interface IUploadInformationService {
    
    getUploadInformationPaginate(
        filters: IUploadInformationFilters
    ): Promise<ApiResponse<IPagingData<IUploadInformation>>>;
    getUploadInformation(): Promise<ApiResponse<IUploadInformation[]>>;
  
}

export default class UploadInformationService implements IUploadInformationService {
    constructor(
      private uploadInformationRepository: IUploadInformationRepository
    ) {}

    async getUploadInformation(): Promise<ApiResponse<IUploadInformation[]>> {
        const res = await this.uploadInformationRepository.getUploadInformation();
    
        if (!res) {
          return new ApiResponse(
            {} as IUploadInformation[],
            EResponseCodes.FAIL,
            "Registro no encontrado"
          );
        }
    
        return new ApiResponse(res, EResponseCodes.OK);
      }


    async getUploadInformationPaginate(
        filters: IUploadInformationFilters
      ): Promise<ApiResponse<IPagingData<IUploadInformation>>> {
        const Activity =
          await this.uploadInformationRepository.getUploadInformationPaginate(filters);
        return new ApiResponse(Activity, EResponseCodes.OK);
      }
    }