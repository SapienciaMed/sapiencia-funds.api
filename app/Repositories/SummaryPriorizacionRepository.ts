import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import {
  IItemResults,
  ISummaryPriorization,
  ISummaryPriorizationXlsx,
} from "App/Interfaces/ItemInterface";
import Item from "App/Models/Item";

export interface ISummaryPriorizacionRepository {
  getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>>;

    getVotinXSLX(
    filters: IVotingFilters
  ): Promise<any>;
}

export default class SummaryPriorizacionRepository
  implements ISummaryPriorizacionRepository
{
  constructor() {}

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>> { // cambiar interface a ISummaryPriorization
    const toReturn: ISummaryPriorization[] = [];

    const query = Item.query()
      .select(
        "PMA_NOMBRE as programa45",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456"
      )
      .sum("ITM_CANTIDAD as quota")
      .sum("ITM_COSTO_TOTAL as total")
      .leftJoin("RTV_RESULTADO_VOTACION", "ITM_CODRTV_RESULTADO_VOTACION", "RTV_RESULTADO_VOTACION.RTV_CODIGO")
      .leftJoin("MTA_MAESTRO_ACTIVIDAD", "ITM_CODMTA_MAESTRO_ACTIVIDAD", "MTA_MAESTRO_ACTIVIDAD.MTA_CODIGO")
      .leftJoin("PMA_PROGRAMA", "MTA_CODPMA_PROGRAMA", "PMA_PROGRAMA.PMA_CODIGO")
    
    

    // const query = VotingResults.query().preload("items", (itemQuery) => {
    //   itemQuery.preload("activity", (activitiQuery) => {
    //     activitiQuery.preload("typesProgram");
    //   });
    // });

    if (filters.communeNeighborhood) {
      query.whereILike(
        "RTV_COMUNA_BARRIO",
        `%${filters.communeNeighborhood}%`
      );
    }
    if (filters.numberProject) {
      query.whereILike("RTV_NUMERO_PROYECTO", `%${filters.numberProject}%`);
    }
    if (filters.validity) {
      query.whereILike("RTV_VIGENCIA", `%${filters.validity}%`);
    }

    query.groupBy("ITM_PORCENTAJE_123", "ITM_PORCENTAJE_456", "PMA_NOMBRE");
    const res = await query.paginate(filters.page, filters.perPage);

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {

        toReturn.push({
          program: i.programa45,
          pct123: i.pct123,
          pct456: i.pct456,
          quota: i.quota,
          total: i.total,
          total123: Number(i.total) * (Number(i.pct123) / 100),
          total456: Number(i.total) * (Number(i.pct456) / 100),
        });
      });



    const { meta } = res.serialize();

    // const itemsArray = dataArray.flatMap((votingResult) => votingResult.items);

    return {
      array: toReturn as any[],
      meta,
    };
  }

    async getVotinXSLX(
    filters: IVotingFilters
  ): Promise<any> { // cambiar interface a ISummaryPriorization
    const toReturn: ISummaryPriorizationXlsx[] = [];

    const query = Item.query()
      .select(
        "PMA_NOMBRE as programa45",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456"
      )
      .sum("ITM_CANTIDAD as quota")
      .sum("ITM_COSTO_TOTAL as total")
      .leftJoin("RTV_RESULTADO_VOTACION", "ITM_CODRTV_RESULTADO_VOTACION", "RTV_RESULTADO_VOTACION.RTV_CODIGO")
      .leftJoin("MTA_MAESTRO_ACTIVIDAD", "ITM_CODMTA_MAESTRO_ACTIVIDAD", "MTA_MAESTRO_ACTIVIDAD.MTA_CODIGO")
      .leftJoin("PMA_PROGRAMA", "MTA_CODPMA_PROGRAMA", "PMA_PROGRAMA.PMA_CODIGO")
    
    

    // const query = VotingResults.query().preload("items", (itemQuery) => {
    //   itemQuery.preload("activity", (activitiQuery) => {
    //     activitiQuery.preload("typesProgram");
    //   });
    // });

    if (filters.communeNeighborhood) {
      query.whereILike(
        "RTV_COMUNA_BARRIO",
        `%${filters.communeNeighborhood}%`
      );
    }
    if (filters.numberProject) {
      query.whereILike("RTV_NUMERO_PROYECTO", `%${filters.numberProject}%`);
    }
    if (filters.validity) {
      query.whereILike("RTV_VIGENCIA", `%${filters.validity}%`);
    }

    query.groupBy("ITM_PORCENTAJE_123", "ITM_PORCENTAJE_456", "PMA_NOMBRE");
    const res = await query.paginate(filters.page, filters.perPage);

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {

        toReturn.push({
          Programa: i.programa45,
          Porcentaje123: i.pct123,
          Valor_Porcentaje123: Number(i.total) * (Number(i.pct123) / 100),
          Porcentaje456: i.pct456,
          Valor_Porcentaje456: Number(i.total) * (Number(i.pct456) / 100),
          Cupos: i.quota,
          Total: i.total,
        });
      });




    // const itemsArray = dataArray.flatMap((votingResult) => votingResult.items);

    return toReturn as any[]
  }
}
