import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";
import { IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import { IVotingResultsRepository } from "App/Repositories/VotingResultsRepository";


  const activities: IMasterActivityVoting = {
      "id": 1,
      "name": "ACTIVIDAD_MAESTRA1",
      "totalValue": 1200000,
      "codProgramCode": 1,
      "description": ''
  }

export class VotingResultsRepositoryFake implements IVotingResultsRepository {

  getActivityProgram(_id: number): Promise<IMasterActivityVoting[]> {
    throw new Error("Method not implemented.");
  }

  
  getVotingResultsById(_id: string): Promise<IVotingResults> {
    return Promise.resolve({} as IVotingResults);
  }
  // getActivityProgram(_idactivity: string): Promise<IMasterActivityVoting> {
  //   return new Promise((res) => {
  //     return res([activities]);
  //   });
  // }
}
