import { IProgramTypes } from "App/Interfaces/TypesProgramInterface";
import ITypesProgramRepository from "App/Repositories/TypeProgramRepository";

const programTypesFake: IProgramTypes = {
  id: 1,
  name: "Pregrado",
};

export class ProgramTypesRepositoryFake
  implements ITypesProgramRepository
{
    getTypesProgramList(): Promise<IProgramTypes[]> {
    return new Promise((res) => {
      return res([programTypesFake]);
    });
  }
}
