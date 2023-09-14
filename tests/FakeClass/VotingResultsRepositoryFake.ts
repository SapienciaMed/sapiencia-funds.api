import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";

export class VotingResultsRepositoryFake implements IVotingResultsRepository {
  getVotingResultsById(_id: string): Promise<IVotingResults> {
    return Promise.resolve({} as IVotingResults);
  }
}
