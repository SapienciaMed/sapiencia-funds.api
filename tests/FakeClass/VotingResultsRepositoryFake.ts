import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";
import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";


export class VotingResultsRepositoryFake implements IVotingResultsRepository {

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
