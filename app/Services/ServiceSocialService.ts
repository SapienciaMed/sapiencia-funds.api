import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IImportServiceSocial } from "App/Interfaces/ImportServiceSocialInterface";
import { ISocialServiceFiltersInterface } from "App/Interfaces/SocialServiceInterface";
import { IServiceSocialRepository } from "App/Repositories/ServiceSocialRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IServiceSocialService {
  import(): Promise<ApiResponse<IImportServiceSocial[]>>;
  insert(data: any[]): Promise<ApiResponse<any[]>>;
  getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<ApiResponse<IPagingData<ISocialServiceFiltersInterface>>>;
}

export default class ServiceSocialService implements IServiceSocialService {
  constructor(private serviceSocialRepository: IServiceSocialRepository) {}

  async import(): Promise<ApiResponse<IImportServiceSocial[]>> {
    try {
      const resPP = await this.serviceSocialRepository.import();

      if (!resPP || resPP.length === 0) {
        return new ApiResponse(
          {} as any[],
          EResponseCodes.FAIL,
          "Registro no encontrado"
        );
      }

      const validateResponse = await this.validate({ data: resPP });

      if (validateResponse.data.length > 0) {
        const insertResponse = await this.insert({
          data: validateResponse.data,
        });
        return insertResponse;
      }

      return validateResponse;
    } catch (error) {
      console.error("Error en el método 'import':", error);
      return new ApiResponse(
        {} as any[],
        EResponseCodes.FAIL,
        "Error al procesar la importación"
      );
    }
  }

  async insert(receivedData: any): Promise<ApiResponse<any[]>> {
    if (!receivedData || !Array.isArray(receivedData.data)) {
      return new ApiResponse(
        {} as any[],
        EResponseCodes.FAIL,
        "Datos inválidos o no proporcionados"
      );
    }

    const dataArray = receivedData.data;

    const transformedData = dataArray.map((item) => ({
      legalizationPeriod: item.period,
      consolidationBeneficiary: item.id,
      hoursBorrowed: item.hoursServicePerform,
      // Agrega aquí cualquier otro campo que necesites
    }));

    try {
      const res = await this.serviceSocialRepository.insert(transformedData);
      return new ApiResponse(res, EResponseCodes.OK);
    } catch (error) {
      console.error("Error en el método 'insert':", error);
      return new ApiResponse(
        {} as any[],
        EResponseCodes.FAIL,
        "Error al insertar datos"
      );
    }
  }

  async validate(receivedData): Promise<ApiResponse<any[]>> {
    // Extraer los registros del JSON
    const records = receivedData.data;

    // Lista para almacenar los registros nuevos
    let newRecords = [];

    // Iterar sobre cada registro
    for (const record of records) {
      // Extraer los campos necesarios para la validación
      const consolidationBeneficiary = record.id;
      const legalizationPeriod = record.period;
      const document = record.document; //cambiar por idUsuario
      // const hoursBorrowed = record.hoursServicePerform;

      if (consolidationBeneficiary != null && legalizationPeriod != null) {
        //verificar si el registro existe en la tabla de BAC_BENEFICIARIOS_A_CONSOLIDAR para evitar errores con llaves foraneas
        const validateConsolidate =
          await this.serviceSocialRepository.validateConsolidate(document); //cambiar por idUsuario

        // Verificar si el registro existe en la base de datos
        if (validateConsolidate && validateConsolidate.id) {
          const existingRecord = await this.serviceSocialRepository.validate(
            validateConsolidate.id,
            legalizationPeriod
          );

          if (!existingRecord) {
            record.id = validateConsolidate.id;
            newRecords.push(record as never);
          }
        }
      }
    }

    return new ApiResponse(newRecords, EResponseCodes.OK);
  }

  async getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<ApiResponse<IPagingData<ISocialServiceFiltersInterface>>> {
    const requeriment =
      await this.serviceSocialRepository.getServiceSocialPaginate(filters);
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }
}
