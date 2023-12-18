import {
  IConsolidationTray,
  IConsolidationTrayParams,
  InitialBeneficiaryInformation,
} from "App/Interfaces/ConsolidationTrayInterface";
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
  geConsolidationSocialService(
    filters: IConsolidationTray
  ): Promise<IPagingData<IConsolidationTrayParams>>;
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
  async geConsolidationSocialService(
    filters: IConsolidationTray
  ): Promise<IPagingData<IConsolidationTrayParams>> {
    //* ********************************************** *//
    //* *** Llamado tabla Aurora (SI ES REQUERIDO) *** *//
    //* ********************************************** *//
    const resAurora = await BeneficiariesConsolidate.query()
      .preload("cuts")
      .preload("programs")
      .preload("statusPacc")
      .orderBy("id", "asc");
    const convertResAurora = resAurora.map(
      (i) => i.serialize() as InitialBeneficiaryInformation
    );

    let infoFiltered: IConsolidationTrayParams[] = [];
    let infoAllData: IConsolidationTrayParams[] = [];
    let infoPaginated: IConsolidationTrayParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const {
      searchParam,
      cutParamName,
      cutParamId,
      page,
      perPage,
      statusPaccSearch,
    } = filters;
    const start: number = (page! - 1) * perPage!;
    const end: number = start + perPage!;

    //* ************************************************************************ //*
    //* **** Ordenemos por el corte que llega de parámetro                       //*
    //* **** Contravalidamos si llega la opción de 'TODOS' sin importar corte    //*
    //* ************************************************************************ //*
    for (const data of convertResAurora) {
      //Solo podemos proceder SII si es Técnico Pacc
      if (data.statusPacc.id === statusPaccSearch) {
        const objParams: IConsolidationTrayParams = {
          idBenef: data.id,
          idCut: data.idCut,
          idProgram: data.idProgram,
          creditId: data.creditNumber,
          nroFiducy: data.fiducyContractNumber,
          document: data.numberDocument,
          fullName: data.fullName,
          program: data.programs.value,
          legalDate: data.legalPeriod,
          dateIncomeCut: data.cuts.from,
          cut: data.cuts.name,
          dateFinallyCut: data.cuts.until,
          dateEndGracePeriod: data.dateEndGracePeriod,
          status: data.statusPacc.description,
          reason: data.reason,
          characterization: data.characterization,
          currentResponsible: data.currentManager,
        };

        if (!cutParamName || cutParamName == null || cutParamName == "") {
          if (data.cuts.id === cutParamId) {
            infoFiltered.push(objParams);
          }
        } else {
          if (cutParamName === "TODOS") {
            infoAllData.push(objParams);
          }
        }
      }
    }

    //* ******************************************************** //*
    //* Defino que tipo de filtro usaré del condicional anterior //*
    //* ******************************************************** //*
    let filterForSearch: IConsolidationTrayParams[] = [];

    if (cutParamName && cutParamName !== "" && cutParamName === "TODOS") {
      filterForSearch = infoAllData;
    } else {
      filterForSearch = infoFiltered;
    }

    //* ******************************************** //*
    //* Revisamos si vienen elementos para consultar //*
    //* ******************************************** //*
    let totalDataContent: number = 0;
    if (searchParam && searchParam !== null && searchParam !== "") {
      const filter: IConsolidationTrayParams[] = filterForSearch.filter(
        (f) =>
          f.creditId.toString().includes(searchParam.toLowerCase()) ||
          f.nroFiducy.toString().includes(searchParam.toLowerCase()) ||
          f.document
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.fullName
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.program
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.legalDate
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.dateIncomeCut.toString().includes(searchParam.toLowerCase()) ||
          f.cut.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.dateFinallyCut.toString().includes(searchParam.toLowerCase()) ||
          f.dateEndGracePeriod
            ?.toString()
            .includes(searchParam.toLowerCase()) ||
          f.status
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.reason
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.characterization
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase()) ||
          f.currentResponsible
            .toLowerCase()
            .toString()
            .includes(searchParam.toLowerCase())
      );

      infoPaginated = filter.slice(start, end);
      totalDataContent = infoPaginated.length;
    } else {
      infoPaginated = filterForSearch.slice(start, end);
      totalDataContent = infoPaginated.length;
    }

    const meta = {
      total: totalDataContent,
      total_general: filterForSearch.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(totalDataContent / perPage!),
    };

    return { array: infoPaginated as IConsolidationTrayParams[], meta };
  }
}
