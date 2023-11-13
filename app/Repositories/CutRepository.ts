import {
  ICutFiltersInterface,
  ICutInterface,
} from "App/Interfaces/CutInterface";
import Cut from "App/Models/Cut";
import { IPagingData } from "App/Utils/ApiResponses";

export interface ICutRepository {
  getCutById(id: number): Promise<ICutInterface[] | null>;
  createCut(Cut: ICutInterface): Promise<ICutInterface | null>;
  getCutPaginate(
    filters: ICutFiltersInterface
  ): Promise<IPagingData<ICutInterface>>;
  updateCut(Cut: ICutInterface, id: number): Promise<ICutInterface | null>;
  deleteCut(id: number): Promise<ICutInterface | null>;
}

export default class CutRepository implements ICutRepository {
  constructor() {}

  async getCutById(id: number): Promise<ICutInterface[] | null> {
    const queryCut = Cut.query().where("id", id);
    const cut = await queryCut;

    if (cut.length === 0) {
      return null;
    }
    return cut.map((i) => i.serialize() as ICutInterface);
  }

  async createCut(cut: ICutInterface): Promise<ICutInterface | null> {
    const existCut = Cut.query()
      .where("name", cut.name)
      .andWhere("from", cut.from)
      .andWhere("until", cut.until);

    const execute = await existCut;

    if (execute.length > 0) return null;

    const toCreate = new Cut();
    toCreate.fill({ ...cut });
    await toCreate.save();
    return toCreate.serialize() as ICutInterface;
  }

  async getCutPaginate(
    filters: ICutFiltersInterface
  ): Promise<IPagingData<ICutInterface>> {
    const res = Cut.query();

    if (filters.name) {
      res.where("name", filters.name);
    }

    if (filters.from) {
      res.andWhere("from", filters.from);
    }

    if (filters.until) {
      res.andWhere("until", filters.until);
    }

    const workerCutPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerCutPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as ICutInterface[],
      meta,
    };
  }

  async updateCut(
    requeriment: ICutInterface,
    id: number
  ): Promise<ICutInterface | null> {
    const toUpdate = await Cut.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...requeriment });

    await toUpdate.save();

    return toUpdate.serialize() as ICutInterface;
  }

  async deleteCut(id: number): Promise<ICutInterface | null> {
    const toDelete = await Cut.find(id);

    if (!toDelete) {
      return null;
    }

    toDelete.fill({ ...toDelete });

    await toDelete.delete();

    return toDelete.serialize() as ICutInterface;
  }
}
