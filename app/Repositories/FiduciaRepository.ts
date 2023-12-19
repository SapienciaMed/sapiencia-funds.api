import Fiducia from "App/Models/Sapiencia/Fiducia";


export interface IFiduciaRepository {
  getFiduciaList(): Promise<any[]>;   
}

export default class FiduciaRepository  implements IFiduciaRepository
{
  constructor() {}

  async getFiduciaList(): Promise<any[]> {
    const res = await Fiducia.query();
    return res.map((i) => i.serialize() as any);
  }
}
  