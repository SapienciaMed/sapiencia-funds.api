import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IConsolidationTray,
  IConsolidationTrayParams,
} from "App/Interfaces/ConsolidationTrayInterface";
import { IImportServiceSocial } from "App/Interfaces/ImportServiceSocialInterface";
import {
  ISocialServiceBeneficiary,
  ISocialServiceFiltersInterface,
} from "App/Interfaces/SocialServiceInterface";
import { IServiceSocialRepository } from "App/Repositories/ServiceSocialRepository";
import { IStorageRepository } from "App/Repositories/StorageRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IServiceSocialService {
  import(): Promise<ApiResponse<IImportServiceSocial[]>>;
  insert(data: any[]): Promise<ApiResponse<any[]>>;
  getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<ApiResponse<IPagingData<ISocialServiceBeneficiary>>>;
  updateSocialService(
    socialService: ISocialServiceBeneficiary,
    id: number
  ): Promise<ApiResponse<ISocialServiceBeneficiary | null>>;
  geConsolidationSocialService(
    filters: IConsolidationTray
  ): Promise<ApiResponse<IPagingData<IConsolidationTrayParams>>>;
  downloadFilesServiceSocial(path: string): Promise<ApiResponse<Buffer>>;
}

export default class ServiceSocialService implements IServiceSocialService {
  constructor(
    private serviceSocialRepository: IServiceSocialRepository,
    private storageRepository: IStorageRepository
  ) {}

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
      supportDocumentRoute: item.supportDocumentRoute
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
      const sapienciaUserCode = record.id; //cambiar por idUsuario
      // const hoursBorrowed = record.hoursServicePerform;

      if (consolidationBeneficiary != null && legalizationPeriod != null) {
        //verificar si el registro existe en la tabla de BAC_BENEFICIARIOS_A_CONSOLIDAR para evitar errores con llaves foraneas
        const validateConsolidate =
          await this.serviceSocialRepository.validateConsolidate(sapienciaUserCode); //cambiar por idUsuario

        // Verificar si el registro existe en la base de datos
        if (validateConsolidate && validateConsolidate.id) {
          const existingRecord = await this.serviceSocialRepository.validate(
            validateConsolidate.id,
            legalizationPeriod
          );

          if (!existingRecord) {
            const urlDocument = "https://fondos.sapiencia.gov.co/convocatorias/frontendrenovacionpp/uploads/index.php"

            record.id = validateConsolidate.id;

            if (record.period <= 10) {
              record.supportDocumentRoute = JSON.stringify(
                {
                  documentPath: `${urlDocument}`,
                  parameters: [
                    {
                      documento: record.document,
                      tipo: 'Acta_Servicio',
                      periodo: record.period,
                      npseleccion: record.pSelection
                    },
                    {
                      documento: record.document,
                      tipo: 'Ficha_Servicio',
                      periodo: record.period,
                      npseleccion: record.pSelection
                    },
                    {
                      documento: record.document,
                      tipo: 'Certificado_Servicio',
                      periodo: record.period,
                      npseleccion: record.pSelection
                    }
                  ]
                }
              );
            } else {
              if (record.performServiceSocial === 'SI') {
                record.supportDocumentRoute = JSON.stringify(
                  {
                    documentPath: `${urlDocument}`,
                    parameters: [
                      {
                        documento: record.document,
                        tipo: 'Formato_Unico',
                        periodo: record.period,
                        npseleccion: record.pSelection
                      }
                    ]
                  }
                )
              }
            }

            newRecords.push(record as never);

          }
        }
      }
    }

    return new ApiResponse(newRecords, EResponseCodes.OK);
  }

  async getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<ApiResponse<IPagingData<ISocialServiceBeneficiary>>> {
    const requeriment =
      await this.serviceSocialRepository.getServiceSocialPaginate(filters);
    let totalPendingHours = 0;

    requeriment.array.forEach((item) => {
      const period = item.beneficiarieConsolidate?.programs?.reglaments?.find(
        (period) =>
          Number(period.initialPeriod.split("-")[0] ?? 0) <=
            Number(item.legalizationPeriod.split("-")[0] ?? 0) &&
          Number(item.legalizationPeriod.split("-")[0] ?? 0) <=
            Number(period.endPeriod.split("-")[0] ?? 0) &&
          Number(period.program) ==
            (item.beneficiarieConsolidate?.idProgram ?? 0)
      );

      const socialServiceHours = period?.socialServiceHours ?? 0;

      item.committedHours = socialServiceHours;
      item.pendingHours = Number(socialServiceHours) - Number(item.hoursDone);

      // Calcular el total de horas pendientes acumuladas
      item.totalPendingHours = totalPendingHours + item.pendingHours;
      totalPendingHours = item.totalPendingHours;
    });
    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async downloadFilesServiceSocial(path: string): Promise<ApiResponse<Buffer>> {
    const res = await this.storageRepository.downloadFile(path);
    if (!res) {
      return new ApiResponse(
        {} as Buffer,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
  async updateSocialService(
    socialService: ISocialServiceBeneficiary,
    id: number
  ): Promise<ApiResponse<ISocialServiceBeneficiary | null>> {
    const res = await this.serviceSocialRepository.updateState(
      socialService,
      id
    );
    let uploadFiles;
    if (socialService?.files) {
      uploadFiles = await this.storageRepository.uploadInformation(
        socialService?.files[0],
        socialService.supportDocumentRoute
      );
    }
    if (!res || !uploadFiles) {
      return new ApiResponse(
        {} as ISocialServiceBeneficiary,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción "
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async geConsolidationSocialService(
    filters: IConsolidationTray
  ): Promise<ApiResponse<IPagingData<IConsolidationTrayParams>>> {
    const technicianCollection =
      await this.serviceSocialRepository.geConsolidationSocialService(filters);
    return new ApiResponse(technicianCollection, EResponseCodes.OK);
  }
}
