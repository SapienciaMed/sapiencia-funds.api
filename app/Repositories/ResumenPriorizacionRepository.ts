import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";
import { IPagingData } from "App/Utils/ApiResponses";
import { IItemResults } from "App/Interfaces/ItemInterface";
import Database from "@ioc:Adonis/Lucid/Database";

export interface IResumenPriorizacionRepository {
  getVotingPaginate(filters: IVotingFilters): Promise<IPagingData<IItemResults>>;
}

export default class ResumenPriorizacionRepository implements IResumenPriorizacionRepository {
  constructor() { }

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>> {
    
   const query = await  Database.rawQuery(`SELECT PMA_NOMBRE as program
        ,ITM_PORCENTAJE_123 as pct123
        ,ITM_PORCENTAJE_456 as pct456,
        sum(ITM_CANTIDAD) as  quota, 
        sum(ITM_COSTO_TOTAL) *  (ITM_PORCENTAJE_123 / 100)  as total123,
        sum(ITM_COSTO_TOTAL) *  (ITM_PORCENTAJE_456 / 100)  as total456,
        sum(ITM_COSTO_TOTAL) total
      from ITM_ITEM 
      join PMA_PROGRAMA on PMA_CODIGO  = ITM_CODPMA_PROGRAMA
      join RTV_RESULTADO_VOTACION on RTV_CODIGO = ITM_CODRTV_RESULTADO_VOTACION 
      Where RTV_COMUNA_BARRIO = '${filters.communeNeighborhood}' and RTV_NUMERO_PROYECTO = '${filters.numberProject}' and RTV_VIGENCIA = ${filters.validity} group by ITM_PORCENTAJE_123 , ITM_PORCENTAJE_456 , PMA_NOMBRE`)
    
    console.log(query)
    
    // const res = VotingResults.query().preload('items', (itemQuery) => {
    //   itemQuery.preload('activiti', (activitiQuery) => {
    //     activitiQuery.preload('typesProgram');
    //   });
    // });

    // if (filters.communeNeighborhood) {
    //   res.whereILike("communeNeighborhood", `%${filters.communeNeighborhood}%`);
    // }
    // if (filters.numberProject) {
    //   res.whereILike("numberProject", `%${filters.numberProject}%`);
    // }
    // if (filters.communeNeighborhood) {
    //   res.whereILike("validity", `%${filters.validity}%`);
    // }
    // // if (filters.communeNeighborhood) {
    // //   res.whereILike("ideaProject", `%${filters.ideaProject}%`);
    // // }       

    const workerMasterActivityPaginated = await query.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];   

    const itemsArray = dataArray.flatMap(votingResult => votingResult.items);

    return {
      array: itemsArray as IItemResults[],
      meta,
    };
  }
}

