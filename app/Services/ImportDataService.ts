import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IImportRepository } from "App/Repositories/ImportDataRepository";

export interface IImportDataService {
    importDataFromSapiencia(): Promise<ApiResponse<any[]>>;
}

export default class ImportDataService implements IImportDataService {
  constructor(private importDataRepository: IImportRepository) {}

  async importDataFromSapiencia(): Promise<ApiResponse<any[]>> {
    const epmBeneficiaries = await this.importDataRepository.getSapienciaEPMBeneficiary();
    const ppBeneficiaries = await this.importDataRepository.getSapienciaPPBeneficiary();
    

    if (!epmBeneficiaries) {
      return new ApiResponse(
        {} as any[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(epmBeneficiaries, EResponseCodes.OK);
  }
}
