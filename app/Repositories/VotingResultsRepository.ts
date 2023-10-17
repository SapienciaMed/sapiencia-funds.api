import { IVotingFilters, IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";
import MasterActivity from "App/Models/MasterActivity";
import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";
import Item from "App/Models/Item";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IVotingResultsRepository {
  getVotingResultsById(id: string): Promise<IVotingResults | null>;
  getActivityProgram(id: number): Promise<IMasterActivityVoting[]>;
  createVotingResult(voting: IVotingResults): Promise<IVotingResults>;
  updateVotingResult(voting: IVotingResults, id: number): Promise<IVotingResults | null>;
  getVotingPaginate(filters: IVotingFilters): Promise<IPagingData<IVotingResults>>;
}

export default class VotingResultsRepository implements IVotingResultsRepository {
  constructor() { }

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IVotingResults>> {
    const res = VotingResults.query();

    if (filters.communeNeighborhood) {
      res.whereILike("communeNeighborhood", `%${filters.communeNeighborhood}%`);
    }
    if (filters.numberProject) {
      res.whereILike("numberProject", `%${filters.numberProject}%`);
    }
    if (filters.communeNeighborhood) {
      res.whereILike("validity", `%${filters.validity}%`);
    }
    if (filters.communeNeighborhood) {
      res.whereILike("ideaProject", `%${filters.ideaProject}%`);
    }       

    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];   

    return {
      array: dataArray as IVotingResults[],
      meta,
    };
  }

  async getVotingResultsById(id: string): Promise<IVotingResults | null> {
    const res = await VotingResults.find(id);
    if (res) {
      await res.load('items');
      return res.serialize() as IVotingResults;
    }
    return null;
  }

  async getActivityProgram(id: number): Promise<IMasterActivityVoting[]> {
    const res = MasterActivity.query().where("codProgramCode", id);
    const rsp = await res;
    return rsp.map((i) => i.serialize() as IMasterActivityVoting);
  }

  async createVotingResult(voting: IVotingResults): Promise<IVotingResults> {
    const toCreate = new VotingResults();

    toCreate.fill({ ...voting });
    await toCreate.save();

    const saveItemPromises = voting.items!.map(itemData => {
      const item = new Item();
      item.fill({ ...itemData, codRtVotingResult: toCreate.id.toString() });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toCreate.load('items');

    return toCreate.serialize() as IVotingResults;
  }

  async updateVotingResult(voting: IVotingResults, id: number): Promise<IVotingResults | null> {
    const toUpdate = await VotingResults.find(id);

    if (!toUpdate) {
      return null;
    }

    await Item.query().where('ITM_CODRTV_RESULTADO_VOTACION', id).delete();

    toUpdate.communeNeighborhood = voting.communeNeighborhood;
    toUpdate.numberProject = voting.numberProject;
    toUpdate.validity = voting.validity;
    toUpdate.ideaProject = voting.ideaProject;

    await toUpdate.save();

    const saveItemPromises = voting.items!.map(itemData => {
      const item = new Item();
      item.fill({ ...itemData, codRtVotingResult: toUpdate.id.toString() });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toUpdate.load('items');

    return toUpdate.serialize() as IVotingResults;
  }

}

