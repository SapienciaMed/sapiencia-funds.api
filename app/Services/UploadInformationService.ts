import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {IUploadInformation,IUploadInformationFilters,} from "App/Interfaces/UploadInformationInterface";
import { IUploadInformationRepository } from "App/Repositories/UploadInformationRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IUploadInformationService {
  createUploadInformation(uploadInformation: IUploadInformation): Promise<ApiResponse<IUploadInformation>>;
  getUploadInformationPaginate(
    filters: IUploadInformationFilters
  ): Promise<ApiResponse<IPagingData<IUploadInformation>>>;
  getUploadInformation(): Promise<ApiResponse<IUploadInformation[]>>;
  getUploadInformationById(id: number): Promise<ApiResponse<IUploadInformation[]>>;
}

export default class UploadInformationService implements IUploadInformationService {
  constructor(
    private uploadInformationRepository: IUploadInformationRepository
  ) {}

  //crear information upload
  async createUploadInformation(uploadInformation: IUploadInformation): Promise<ApiResponse<IUploadInformation>> {
    const res = await this.uploadInformationRepository.createUploadInformation(uploadInformation);
    if (!res) {
      return new ApiResponse(
        {} as IUploadInformation,
        EResponseCodes.FAIL,
        "*Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

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
    const Upload =
      await this.uploadInformationRepository.getUploadInformationPaginate(filters);
    return new ApiResponse(Upload, EResponseCodes.OK);
  }

  async getUploadInformationById(
    id: number
  ): Promise<ApiResponse<IUploadInformation[]>> {
    const res = await this.uploadInformationRepository.getUploadInformationById(id);

    if (!res) {
      return new ApiResponse(
        {} as IUploadInformation[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

}