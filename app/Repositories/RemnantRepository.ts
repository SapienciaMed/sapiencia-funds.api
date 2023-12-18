import Database from "@ioc:Adonis/Lucid/Database";
import { IRemnant, IRemnantFilters } from "App/Interfaces/IRemnantInterface";
import { IMaster, IMasterFilters } from "App/Interfaces/MasterInterface";
import Master from "App/Models/Master";
import Remanente from "App/Models/Remanente";
import { IPagingData } from "App/Utils/ApiResponses";


export interface IRemnantRepository {
  createMaster(master: IMaster): Promise<IMaster>;
  getallRemnantsPaginated(filters: IRemnantFilters): Promise<IPagingData<IRemnant>>;
  getMasterList(): Promise<IMaster[]>;
  importRemnants(filters: IMasterFilters): Promise<any>;
}


export default class RemnantRepository implements IRemnantRepository {

  constructor() { }

  async getallRemnantsPaginated(
    filters: IRemnantFilters
  ): Promise<IPagingData<IRemnant>> {
    const res = Remanente.query();

    if (filters.announcement) {
      res.whereILike("announcement", `%${filters.announcement}%`);
    }
    if (filters.fund) {
      res.whereILike("communityFund", `%${filters.fund}%`);
    }
    if (filters.trust) {
      res.whereILike("trust", `%${filters.trust}%`);
    }

    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as any[],
      meta,
    };
  }

  async importRemnants(filters: IRemnantFilters): Promise<any> {
    const data = await Database.connection("mysql_sapiencia").rawQuery(
      "call aurora_remanentes (:periodo,:comuna,:idfiducia)",
      {
        periodo: filters.announcement,
        comuna: filters.fund,
        idfiducia: filters.trust,
      }
    );
    
    const results = data[0][0];   

    // Insertar cada fila en el modelo Remanente, asignando propiedades manualmente
    const insertPromises = results.map(async (row) => {     
       
        const remanenteData = {
            announcement: row.periodo, 
            trust: row.idfiducia, 
            communityFund: row.comuna,
            remaining: row.restante_presupuesto_comuna,
            averageCost: row.presupuesto_comuna,
            quotas: row.numero_usuarios_comuna,
            quotaResource: row.acumulado_legali_comuna,
            residual: row.puntaje_corte,
            idProgram: row.modalidad,
            userCreate: process.env.CURRENT_USER_DOCUMENT,
            dateCreate: new Date()
        };

        // Inserta el objeto en la base de datos
        return await Remanente.create(remanenteData);
    });

    // Esperar a que todas las inserciones se completen
    await Promise.all(insertPromises);

    return results;



  }





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


  async getMasterList(): Promise<IMaster[]> {
    const res = await Master.query().preload('typeMasterList');
    return res.map((i) => i.serialize() as IMaster);
  }

}