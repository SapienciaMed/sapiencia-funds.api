import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";

export interface IVotingResultsRepository {
  getVotingResultsById(id: string): Promise<IVotingResults | null>;
}

export default class VotingResultsRepository implements IVotingResultsRepository {
  constructor() {}

  async getVotingResultsById(id: string): Promise<IVotingResults | null> {
    const res = await VotingResults.find(id)
    return res
  }
}
