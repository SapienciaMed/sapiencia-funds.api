import { ISocialization } from "App/Interfaces/ISocialization";
import Socialization from "App/Models/Socialization";

export interface ISocializationRepository {
  getSocializationById(id: number): Promise<ISocialization | null>;
}

export default class SocializationRepository
  implements ISocializationRepository
{
  constructor() {}

  async getSocializationById(id: number): Promise<ISocialization | null> {
    const res = await Socialization.find(id);
    return res ? (res.serialize() as ISocialization) : null;
  }
}
