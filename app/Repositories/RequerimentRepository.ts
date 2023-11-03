import {
  IRequerimentFiltersInterface,
  IRequerimentInterface,
  IRequerimentUpdateInterface,
} from "App/Interfaces/IRequerimentInterface";
import Requeriment from "App/Models/Requeriment";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IRequerimentRepository {
  createRequeriment(
    requeriment: IRequerimentInterface
  ): Promise<IRequerimentInterface>;
  getRequerimentPaginate(
    filters: IRequerimentFiltersInterface
  ): Promise<IPagingData<IRequerimentInterface>>;
  updateRequeriment(
    requeriment: IRequerimentUpdateInterface,
    id: number
  ): Promise<IRequerimentInterface | null>;
  deleteRequeriment(id: number): Promise<IRequerimentInterface | null>;
  deleteByReglamentId(id: number): Promise<number>;
}

export default class RequerimentRepository implements IRequerimentRepository {
  constructor() {}

  async createRequeriment(
    requeriment: IRequerimentInterface
  ): Promise<IRequerimentInterface> {
    const toCreate = new Requeriment();
    toCreate.fill({ ...requeriment });
    await toCreate.save();
    return toCreate.serialize() as IRequerimentInterface;
  }

  async getRequerimentPaginate(
    filters: IRequerimentFiltersInterface
  ): Promise<IPagingData<IRequerimentInterface>> {
    const res = Requeriment.query();

    res.where("codReglament", `${filters.codReglament}`);

    //PREGUNTAR
    // if (filters.percent) {
    //   res.orderBy("percent");
    // }

    const workerRequerimentPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerRequerimentPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as IRequerimentInterface[],
      meta,
    };
  }

  async updateRequeriment(
    requeriment: IRequerimentUpdateInterface,
    id: number
  ): Promise<IRequerimentInterface | null> {
    const toUpdate = await Requeriment.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...requeriment });

    await toUpdate.save();

    return toUpdate.serialize() as IRequerimentInterface;
  }

  async deleteRequeriment(id: number): Promise<IRequerimentInterface | null> {
    const toDelete = await Requeriment.find(id);

    if (!toDelete) {
      return null;
    }

    toDelete.fill({ ...toDelete });

    await toDelete.delete();

    return toDelete.serialize() as IRequerimentInterface;
  }

  async deleteByReglamentId(id: number): Promise<number> {
    const toDelete = await Requeriment.query()
      .where("codReglament", id)
      .delete();

    return toDelete[0];
  }
}
