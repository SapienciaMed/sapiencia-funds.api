import {
  ISocialization,
  ISocializationFilters,
  ISocializationUpdate,
} from "App/Interfaces/ISocialization";
import Socialization from "App/Models/Socialization";
import { IPagingData } from "App/Utils/ApiResponses";

export interface ISocializationRepository {
  getSocializationById(id: number): Promise<ISocialization[] | null>;
  createSocialization(socialization: ISocialization): Promise<ISocialization>;
  getSocializationPaginate(
    filters: ISocializationFilters
  ): Promise<IPagingData<ISocialization>>;
  updateSocialization(
    socialization: ISocializationUpdate,
    id: number
  ): Promise<ISocialization | null>;
}

export default class SocializationRepository
  implements ISocializationRepository
{
  constructor() {}

  async createSocialization(
    socialization: ISocialization
  ): Promise<ISocialization> {
    const toCreate = new Socialization();
    toCreate.fill({ ...socialization });
    await toCreate.save();
    return toCreate.serialize() as ISocialization;
  }

  async getSocializationById(id: number): Promise<ISocialization[] | null> {
    const querySocialization = Socialization.query().where("id", id);
    const socialization = await querySocialization;

    if (socialization.length === 0) {
      return null;
    }
    return socialization.map((i) => i.serialize() as ISocialization);
  }

  async getSocializationPaginate(
    filters: ISocializationFilters
  ): Promise<IPagingData<ISocialization>> {
    const res = Socialization.query();

    if (filters.noProyect) {
      res.where("noProyect", `%${filters.noProyect}%`);
    }

    if (filters.communeCode) {
      res.where("communeCode", filters.communeCode);
    }

    if (filters.validity) {
      res.where("validity", filters.validity);
    }

    const workerSocializationPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerSocializationPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as ISocialization[],
      meta,
    };
  }

  async updateSocialization(
    socialization: ISocializationUpdate,
    id: number
  ): Promise<ISocialization | null> {
    const toUpdate = await Socialization.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...socialization });

    await toUpdate.save();

    return toUpdate.serialize() as ISocialization;
  }
}
