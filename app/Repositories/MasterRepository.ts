import { IMaster, IMasterFilters } from "App/Interfaces/MasterInterface";
import Master from "App/Models/Master";
import { IPagingData } from "App/Utils/ApiResponses";


export interface IMasterRepository {
  createMaster(master: IMaster): Promise<IMaster>;
  getMasterPaginate(filters: IMasterFilters): Promise<IPagingData<IMaster>>;
  getMasterList(): Promise<IMaster[]>;
}


export default class MasterRepository implements IMasterRepository {

  constructor() { }

  async createMaster(master: IMaster): Promise<IMaster> {

    const existingMaster = await Master.query()
      .where('codtlmo', master.codtlmo)
      .andWhere('name', master.name)
      .first();

    if (existingMaster) {
      throw new Error('El dato ya existe');
    }

    const toCreate = new Master();

    toCreate.fill({ ...master });
    await toCreate.save();
    return toCreate.serialize() as IMaster;
  }

  async getMasterPaginate(
    filters: IMasterFilters
  ): Promise<IPagingData<IMaster>> {
    const res = Master.query().preload('typeMasterList');

    if (filters.codtlmo) {
      res.whereILike("codtlmo", `%${filters.codtlmo}%`);
    }

    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as IMaster[],
      meta,
    };
  }

  async getMasterList(): Promise<IMaster[]> {
    const res = await Master.query().preload('typeMasterList');
    return res.map((i) => i.serialize() as IMaster);
  }

}