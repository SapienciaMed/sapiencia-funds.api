import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import {
  IItemResults,
  ISummaryPriorization,
} from "App/Interfaces/ItemInterface";
import Item from "App/Models/Item";

export interface ISummaryPriorizacionRepository {
  getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>>;
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
        "PMA_NOMBRE as program",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456"
      )
      .sum("ITM_CANTIDAD as quota")
      .sum("ITM_COSTO_TOTAL as total")
      .join("PMA_PROGRAMA", "PMA_CODIGO", "ITM_CODPMA_PROGRAMA")
      .groupBy("ITM_PORCENTAJE_123", "ITM_PORCENTAJE_456", "PMA_NOMBRE");

    // const query = VotingResults.query().preload("items", (itemQuery) => {
    //   itemQuery.preload("activity", (activitiQuery) => {
    //     activitiQuery.preload("typesProgram");
    //   });
    // });

    // if (filters.communeNeighborhood) {
    //   query.whereILike(
    //     "communeNeighborhood",
    //     `%${filters.communeNeighborhood}%`
    //   );
    // }
    // if (filters.numberProject) {
    //   query.whereILike("numberProject", `%${filters.numberProject}%`);
    // }
    // if (filters.communeNeighborhood) {
    //   query.whereILike("validity", `%${filters.validity}%`);
    // }

    const res = await query.paginate(filters.page, filters.perPage);

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {
        toReturn.push({
          program: "",
          pct123: i.pct123,
          pct456: i.pct456,
          quota: i.quota,
          total: i.total,
          total123: Number(i.total) * (Number(i.pct123) / 100),
          total456: Number(i.total) * (Number(i.pct456) / 100),
        });
      });

    console.log(toReturn);

    const { meta } = res.serialize();

    // const itemsArray = dataArray.flatMap((votingResult) => votingResult.items);

    return {
      array: toReturn as any[],
      meta,
    };
  }
}
