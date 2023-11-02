import { IVotingFilters } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";
import { IPagingData } from "App/Utils/ApiResponses";
import { IItemResults } from "App/Interfaces/ItemInterface";

export interface IResumenPriorizacionRepository {
  getVotingPaginate(filters: IVotingFilters): Promise<IPagingData<IItemResults>>;
}

export default class ResumenPriorizacionRepository implements IResumenPriorizacionRepository {
  constructor() { }

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>> {
    
    const res = VotingResults.query().preload('items', (itemQuery) => {
      itemQuery.preload('activiti', (activitiQuery) => {
        activitiQuery.preload('typesProgram');
      });
    });

    if (filters.communeNeighborhood) {
      res.whereILike("communeNeighborhood", `%${filters.communeNeighborhood}%`);
    }
    if (filters.numberProject) {
      res.whereILike("numberProject", `%${filters.numberProject}%`);
    }
    if (filters.communeNeighborhood) {
      res.whereILike("validity", `%${filters.validity}%`);
    }
    // if (filters.communeNeighborhood) {
    //   res.whereILike("ideaProject", `%${filters.ideaProject}%`);
    // }       

    const workerMasterActivityPaginated = await res.paginate(
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

