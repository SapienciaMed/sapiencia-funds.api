import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";
import MasterActivity from "App/Models/MasterActivity";
import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";

export interface IVotingResultsRepository {
  getVotingResultsById(id: string): Promise<IVotingResults | null>;
  getActivityProgram(id : number): Promise<IMasterActivityVoting[]>;

}

export default class VotingResultsRepository implements IVotingResultsRepository {
  constructor() {}

  async getVotingResultsById(id: string): Promise<IVotingResults | null> {
    const res = await VotingResults.find(id)
    return res
  }

  async getActivityProgram(id: number): Promise<IMasterActivityVoting[]> {
    console.log(id)
    const res = MasterActivity.query().where("codProgramCode", id);
    const rsp = await res;
    return rsp.map((i) => i.serialize() as IMasterActivityVoting);
  }
}
