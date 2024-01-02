import Env from "@ioc:Adonis/Core/Env";
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
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { EStatesBeneficiary } from "App/Constants/StatesBeneficiaryEnum";

export interface IServiceSocialService {
  import(): Promise<ApiResponse<IImportServiceSocial[]>>;
  insert(data: any[]): Promise<ApiResponse<any[]>>;
  getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<ApiResponse<IPagingData<ISocialServiceBeneficiary>>>;
  updateSocialService(
    socialService: ISocialServiceBeneficiary,
    id: number,
    files: MultipartFileContract[]
  ): Promise<ApiResponse<ISocialServiceBeneficiary | null>>;
  geConsolidationSocialService(
    filters: IConsolidationTray
  ): Promise<ApiResponse<IPagingData<IConsolidationTrayParams>>>;
  downloadFilesServiceSocial(path: string): Promise<Buffer | null>;
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
      
      legalizationPeriod: item.periodDetail,
      consolidationBeneficiary: item.id,
      hoursBorrowed: item.hoursServicePerform,
      supportDocumentRoute: item.supportDocumentRoute,
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
      let legalizationPeriod = record.periodDetail;
      const sapienciaUserCode = record.id; //cambiar por idUsuario

      legalizationPeriod = (legalizationPeriod == 14) ? 72 : legalizationPeriod + 1;
    
      // const hoursBorrowed = record.hoursServicePerform;

      if (consolidationBeneficiary != null && legalizationPeriod != null) {
        //verificar si el registro existe en la tabla de BAC_BENEFICIARIOS_A_CONSOLIDAR para evitar errores con llaves foraneas
        const validateConsolidate =
          await this.serviceSocialRepository.validateConsolidate(
            sapienciaUserCode
          ); 

        // Verificar si el registro existe en la base de datos
        if (validateConsolidate && validateConsolidate.id) {
          const existingRecord = await this.serviceSocialRepository.validate(
            validateConsolidate.id,
            legalizationPeriod
          );

          if (!existingRecord) {
            const urlDocument =
              "https://fondos.sapiencia.gov.co/convocatorias/frontendrenovacionpp/uploads/index.php";

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
                      npseleccion: record.pselectionDetail
                    },
                    {
                      documento: record.document,
                      tipo: 'Ficha_Servicio',
                      periodo: record.period,
                      npseleccion: record.pselectionDetail
                    },
                    {
                      documento: record.document,
                      tipo: 'Certificado_Servicio',
                      periodo: record.period,
                      npseleccion: record.pselectionDetail
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
                        npseleccion: record.pselectionDetail
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

    const rutasFiles = await this.storageRepository.getFiles(
      `${Env.get("GCLOUD_PATH_SOCIAL_SERVICES")}`
    );

    const lastIdPeriod =
      await this.serviceSocialRepository.getLastIdByIdServiceSocial(filters.id);

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

      item.infoFiles = rutasFiles.data.filter((infoRouteFile) => {
        const id = infoRouteFile.path.split(`/`)[1];

        if (Number(id) === item.id) return infoRouteFile;
      });

      if (lastIdPeriod?.id === item.id) {
        item.editable = true;
      } else {
        item.editable = false;
      }

      item.committedHours = socialServiceHours;
      item.pendingHours = Number(socialServiceHours) - Number(item.hoursDone);

      if (item.documentPath)
        item.externalInfoFiles = JSON.parse(item.documentPath);

      // Calcular el total de horas pendientes acumuladas
      item.totalPendingHours = totalPendingHours + item.pendingHours;
      totalPendingHours = item.totalPendingHours;
    });

    return new ApiResponse(requeriment, EResponseCodes.OK);
  }

  async downloadFilesServiceSocial(path: string): Promise<Buffer | null> {
    const res = await this.storageRepository.downloadFile(path);

    if (!res) {
      return null;
    }

    return res;
  }
  async updateSocialService(
    socialService: ISocialServiceBeneficiary,
    id: number,
    files: MultipartFileContract[]
  ): Promise<ApiResponse<ISocialServiceBeneficiary | null>> {
    const lastId =
      await this.serviceSocialRepository.getLastIdByIdServiceSocial(
        socialService.idConsolidationBeneficiary
      );

    let res = {} as ISocialServiceBeneficiary | null;

    if (lastId?.id === Number(socialService.id)) {
      res = await this.serviceSocialRepository.updateState(
        {
          ...socialService,
        },
        id
      );

      await this.serviceSocialRepository.updateStateBeneficiariesConsolidate(
        socialService.idConsolidationBeneficiary,
        EStatesBeneficiary.PaccTechnician
      );
    }

    if (files.length > 0) {
      await this.storageRepository.uploadInformation(
        files[0],
        `${Env.get("GCLOUD_PATH_SOCIAL_SERVICES")}/${id}/`
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
