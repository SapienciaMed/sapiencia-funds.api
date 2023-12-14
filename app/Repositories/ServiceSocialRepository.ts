import {
  IImportServiceSocial,
  IInsertServiceSocial,
  IValidateServiceSocial,
} from "App/Interfaces/ImportServiceSocialInterface";
import {
  ISocialServiceBeneficiary,
  ISocialServiceFiltersInterface,
} from "App/Interfaces/SocialServiceInterface";
///import AuroraEfeRenovado from "App/Models/AuroraEfeRenovado";
//import AuroraFaRenovado from "App/Models/AuroraFaRenovado";
import BeneficiariesConsolidate from "App/Models/BeneficiariesConsolidate";
import BeneficiarySocialService from "App/Models/BeneficiarySocialService";
import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";
import AuroraPpRenovado from "App/Models/Sapiencia/AuroraPpRenovado";
import ServiceSocialBeneficiary from "App/Models/ServiceSocialBeneficiary";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IServiceSocialRepository {
  import(): Promise<IImportServiceSocial[]>;
  insert(data: any): Promise<IInsertServiceSocial[]>;
  validate(
    consolidationBeneficiary: string,
    legalizationPeriod: string
  ): Promise<IValidateServiceSocial | null>;
  validateConsolidate(consolidationBeneficiary: string): Promise<any | null>;
  getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<IPagingData<ISocialServiceBeneficiary>>;
  updateState(
    data: ISocialServiceBeneficiary,
    id: number
  ): Promise<ISocialServiceBeneficiary | null>;
}

export default class ServiceSocialRepository
  implements IServiceSocialRepository
{
  constructor() {}

  async import(): Promise<IImportServiceSocial[]> {
    // Consulta para el modelo AuroraPpRenovado
    const dataAuroraPpRenovado = await AuroraPpRenovado.query().limit(10);
    //const serializedDataAuroraPpRenovado = dataAuroraPpRenovado.map((item) => item.serialize());
    const serializedDataAuroraPpRenovado = dataAuroraPpRenovado.map((item) => {
      let serializedItem = item.serialize();
      serializedItem.origen = "PP";
      return serializedItem;
    });

    // Consulta para el modelo AuroraEpmRenovado
    const dataAuroraEpmRenovado = await AuroraEpmRenovado.query().limit(10);
    const serializedDataAuroraEpmRenovado = dataAuroraEpmRenovado.map((item) =>
      item.serialize()
    );

    // Combinando ambos conjuntos de datos en una sola lista
    const combinedData = [
      ...serializedDataAuroraPpRenovado,
      ...serializedDataAuroraEpmRenovado,
    ];

    const filteredData = combinedData.filter(
      (item) => item.hoursServicePerform != null
    );

    const filterF = filteredData.filter(
      (item) => item.performServiceSocial.toUpperCase() !== "NO"
    );

    return filterF;
  }

  async validate(
    consolidationBeneficiary: string,
    legalizationPeriod: string
  ): Promise<IValidateServiceSocial | null> {
    try {
      // Construir la consulta base con las condiciones siempre presentes
      let query = ServiceSocialBeneficiary.query()
        .where("consolidationBeneficiary", consolidationBeneficiary)
        .where("legalizationPeriod", legalizationPeriod);

      // Ejecutar la consulta
      const data = await query.first();

      // Devolver los datos serializados si existen
      return data?.serialize() as any;
    } catch (error) {
      console.error("Error en la función validate:", error);
      // Manejar el error como consideres necesario
      return null;
    }
  }

  async validateConsolidate(document: string): Promise<any | null> {
    try {
      // Construir la consulta base con las condiciones siempre presentes
      let query = BeneficiariesConsolidate.query().where(
        "numberDocument",
        document
      ); //cambiar por idUsuario

      const data = await query.first();

      // Devolver los datos serializados si existen
      return data?.serialize() as any;
    } catch (error) {
      console.error("Error en la función validate:", error);
      // Manejar el error como consideres necesario
      return null;
    }
  }

  async insert(
    data: {
      legalizationPeriod: string;
      consolidationBeneficiary: number;
      hoursBorrowed: number;
      supportDocumentRoute: string;
    }[]
  ): Promise<IInsertServiceSocial[]> {
    // Inserta los datos en la base de datos usando el modelo
    const insertedItems = await ServiceSocialBeneficiary.createMany(data);

    // Retorna los elementos insertados
    return insertedItems;
  }

  async updateState(
    data: ISocialServiceBeneficiary,
    id: number
  ): Promise<ISocialServiceBeneficiary | null> {
    const toUpdate = await BeneficiarySocialService.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...data });

    await toUpdate.save();

    return toUpdate.serialize() as ISocialServiceBeneficiary;
  }

  async getServiceSocialPaginate(
    filters: ISocialServiceFiltersInterface
  ): Promise<IPagingData<ISocialServiceBeneficiary>> {
    const res = BeneficiarySocialService.query();
    res.whereHas("beneficiarieConsolidate", (beneficiarieConsolidateQuery) => {
      beneficiarieConsolidateQuery.where("id", filters.id);
    });
    res.preload("beneficiarieConsolidate", (beneficiarieConsolidateQuery) => {
      beneficiarieConsolidateQuery.preload(
        "requerimentsConsolidate",
        (requerimentsConsolidateQuery) => {
          requerimentsConsolidateQuery.where(
            "mandatoryFor",
            "=",
            "Servicio social"
          );
        }
      );
      beneficiarieConsolidateQuery.preload("programs", (programsQuery) => {
        programsQuery.preload("reglaments");
      });
      beneficiarieConsolidateQuery.where("id", filters.id);
    });

    const workerBeneficiariesConsolidatePaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerBeneficiariesConsolidatePaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as ISocialServiceBeneficiary[],
      meta,
    };
  }
}
