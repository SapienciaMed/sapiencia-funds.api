import { IItemResults } from "App/Interfaces/ItemInterface";
import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";
import {
  IVotingFilters,
  IVotingPaginateFilters,
  IVotingResults,
} from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";
import { IPagingData } from "App/Utils/ApiResponses";

export class VotingResultsRepositoryFake implements IVotingResultsRepository {
  getVotingPaginateXlsx(__filters: IVotingFilters): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPaginatedtotal(__filters: IVotingPaginateFilters): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getVotingPaginate(): Promise<IPagingData<IItemResults>> {
    throw new Error("Method not implemented.");
  }

  getActivityProgram(_id: number): Promise<IMasterActivityVoting[]> {
    throw new Error("Method not implemented.");
  }

  getVotingResultsById(_id: string): Promise<IVotingResults> {
    return Promise.resolve({} as IVotingResults);
  }

  createVotingResult(): Promise<IVotingResults> {
    return Promise.resolve({} as IVotingResults);
  }
  updateVotingResult(): Promise<IVotingResults> {
    return Promise.resolve({} as IVotingResults);
  }
}
