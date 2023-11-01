import {
  IReglamentFiltersInterface,
  IReglamentInterface,
} from "App/Interfaces/IReglamentInterface";
import Reglament from "App/Models/Reglament";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IReglamentRepository {
  getReglamentById(id: number): Promise<IReglamentInterface[] | null>;
  createReglament(reglament: IReglamentInterface): Promise<IReglamentInterface>;
  getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<IPagingData<IReglamentInterface>>;
  updateReglament(
    reglament: IReglamentInterface,
    id: number
  ): Promise<IReglamentInterface | null>;
  deleteReglament(id: number): Promise<IReglamentInterface | null>;
}

export default class ReglamentRepository implements IReglamentRepository {
  constructor() {}

  async getReglamentById(id: number): Promise<IReglamentInterface[] | null> {
    const queryReglament = Reglament.query().where("id", id);
    const reglament = await queryReglament;

    if (reglament.length === 0) {
      return null;
    }
    return reglament.map((i) => i.serialize() as IReglamentInterface);
  }

  async createReglament(
    reglament: IReglamentInterface
  ): Promise<IReglamentInterface> {
    const toCreate = new Reglament();
    toCreate.fill({ ...reglament });
    await toCreate.save();
    return toCreate.serialize() as IReglamentInterface;
  }

  async getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<IPagingData<IReglamentInterface>> {
    const res = Reglament.query();

    //res.where("codReglament", `${filters.codReglament}`);

    //PREGUNTAR
    // if (filters.percent) {
    //   res.orderBy("percent");
    // }

    const workerReglamentPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerReglamentPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as IReglamentInterface[],
      meta,
    };
  }

  async updateReglament(
    requeriment: IReglamentInterface,
    id: number
  ): Promise<IReglamentInterface | null> {
    const toUpdate = await Reglament.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...requeriment });

    await toUpdate.save();

    return toUpdate.serialize() as IReglamentInterface;
  }

  async deleteReglament(id: number): Promise<IReglamentInterface | null> {
    const toDelete = await Reglament.find(id);

    if (!toDelete) {
      return null;
    }

    toDelete.fill({ ...toDelete });

    await toDelete.delete();

    return toDelete.serialize() as IReglamentInterface;
  }
}
